from .models import Product,Category,Cart,CartItem,ProductReview
from rest_framework import serializers

class MultipleProductSerialzer(serializers.ModelSerializer):
    categories_titles = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'pid', 'title', 'image', 'price', 'sales_price','categories', 'categories_titles']

    def get_categories_titles(self, obj):
        return [category.title for category in obj.categories.all()]


class ProductSerializer(serializers.ModelSerializer):
    categories_titles = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'pid', 'title', 'image', 'short_description', 'description', 'price', 'sales_price', 'specification', 'product_status', 'status', 'in_stock', 'featured', 'digital', 'sku', 'date', 'updated', 'user', 'vendor', 'categories', 'categories_titles']

    def get_categories_titles(self, obj):
        return [category.title for category in obj.categories.all()]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = CartItem
        fields = ('product', 'quantity')

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    
    class Meta:
        model = Cart
        fields = ('id', 'user', 'items')
             
class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductReview
        fields='__all__'
