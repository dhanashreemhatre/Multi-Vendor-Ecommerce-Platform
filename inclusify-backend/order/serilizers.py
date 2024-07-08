from rest_framework import serializers
from .models import Order, OrderItem, Payment, Coupon, ShippingAddress

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['address', 'city', 'state', 'zip_code']
        extra_kwargs = {
            'city': {'required': False, 'allow_blank': True},
            'zip_code': {'required': False, 'allow_blank': True},
        }


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount', 'valid_from', 'valid_to', 'is_active']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    shipping_address = ShippingAddressSerializer()
    coupon = CouponSerializer(required=False, allow_null=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'total_amount', 'created_at', 'status', 'shipping_address', 'coupon']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        shipping_address_data = validated_data.pop('shipping_address')
        coupon_data = validated_data.pop('coupon', None)
        
        # Create the order
        order = Order.objects.create(**validated_data)
        
        # Create shipping address
        ShippingAddress.objects.create(order=order, **shipping_address_data)
        
        # Create order items
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order

        
    
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'amount', 'payment_method', 'transaction_id', 'status', 'created_at']