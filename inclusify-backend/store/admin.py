from django.contrib import admin
from .models import Product,Category,Cart,CartItem

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=('title',)
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display=('title','parent')

admin.site.register(Cart)
admin.site.register(CartItem)