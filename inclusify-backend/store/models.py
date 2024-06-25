import math
from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe,format_html
from accounts.models import Account
from vendor.models import Vendor
from django.db.models import Avg,Count


   

STATUS=(
     ('draft','Draft'),
    ('disabled','Disabled'),
    ('rejected','Rejected'),
    ('in_review','In Review'),
    ('published','Published')
)
   



def user_directory_path(instance,filename):
    return 'user _{0}/{1}'.format(instance.user.id,filename)

class Category(models.Model):
    cid=ShortUUIDField(unique=True,length=10,max_length=20,prefix="cat",alphabet="abcdefgh12345")
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    image=models.ImageField(upload_to="category",default="category.jpg")

    class Meta:
        verbose_name_plural="Categories"

    def category_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>'%(self.image.url))
    
    def __str__(self):
        return self.title
    
attr_choices=(
    ('color','color'),
    ('image','image'),
    ('text','text')
)


    
class Product(models.Model):
    pid=ShortUUIDField(unique=True,length=10,max_length=20,alphabet="abcdefgh12345")

    user=models.ForeignKey(Account,on_delete=models.SET_NULL,null=True)
    categories = models.ManyToManyField(Category, related_name="products")
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)

    title=models.CharField(max_length=100,default="computer")
    image=models.FileField(upload_to=user_directory_path,default="product.jpg")
    short_description = models.TextField(null=True, blank=True, default="this is the product")
    description = models.TextField(null=True, blank=True, default="this is good product")

    price=models.DecimalField(max_digits=99999999999999,decimal_places=2,default="99.00")
    sales_price=models.DecimalField(max_digits=99999999999999,decimal_places=2,null=True,blank=True)

    specification=models.TextField(null=True, blank=True, default="Net Quantity:1")

    product_status=models.CharField(choices=STATUS,max_length=10,default="in_review")

    status=models.BooleanField(default=True)
    in_stock=models.BooleanField(default=True)
    featured=models.BooleanField(default=False)
    digital=models.BooleanField(default=False)

    sku=ShortUUIDField(unique=True,length=4,max_length=10,prefix="sku",alphabet="abcdefgh12345")

    date=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(null=True,blank=True)
    
    class Meta:
        verbose_name_plural="Products"

    def product_image(self):
        if self.image:
            return format_html('<img src="{}" width="50" height="50"/>', self.image.url)
        else:
            return "No Image"  
  
    def __str__(self):
        return format_html('{} {}', self.product_image(), self.title)


    
    def get_percentage(self):
        new_price=math.ceil(((self.old_price- self.price)/self.old_price)*100)
        return new_price
    
    def averageReview(self):
        reviews=ProductReview.objects.filter(product=self,status=True).aggregate(average=Avg('rating'))
        avg=0
        if reviews['average'] is not None:
            avg=float(reviews['average'])
            return avg
    def reviewCount(self):
        reviews=ProductReview.objects.filter(product=self,status=True).aggregate(count=Count('rating'))
        count=0
        if reviews['count'] is not None:
            count=int(reviews['count'])
            return  count
        
    
    def get_url(self):
        return self.pid



class ProductImages(models.Model):
    images=models.ImageField(upload_to="product-images",default="product.jpg")
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    date=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="Product Images"

    
  ############################# product, review, wishlist addresss ######################## 
    ############################# product, review, wishlist addresss ######################## 
      ############################# product, review, wishlist addresss ######################## 

class ProductReview(models.Model):
    user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    subject = models.CharField(max_length=200, blank=True)
    review = models.TextField(null=True)
    rating = models.FloatField(default=0.0) 
    ip = models.CharField(max_length=20, blank=True)
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_add = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        verbose_name_plural="Product Reviews"

    def __str__(self):
        return self.product.title if self.product else 'No Product'

    
    def get_rating(self):
        return self.rating
    

      ############################# cart ######################## 
      ############################# cart ######################## 
        ############################# cart ######################## 

class Cart(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    items = models.ManyToManyField('CartItem')

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)


