from django.contrib import admin
from .models import Product,Category,Cart,CartItem,ProductImages

# Register your models here.
class ProductImagesInline(admin.TabularInline):
    model = ProductImages
        

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=('title',)
    list_filter=('categories',)
    inlines = [ProductImagesInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display=('title','parent')

admin.site.register(Cart)
admin.site.register(CartItem)