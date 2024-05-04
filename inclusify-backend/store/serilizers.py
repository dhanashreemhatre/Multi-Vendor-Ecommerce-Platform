from .models import Product,Category,Cart,CartItem
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

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
             