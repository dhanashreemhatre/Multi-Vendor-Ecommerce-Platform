from django.contrib import admin
from .models import Order, OrderItem, Payment, Coupon, ShippingAddress

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'user__email']
    inlines = [OrderItemInline]

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'amount', 'payment_method', 'status', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['order__user__username', 'order__user__email', 'transaction_id']

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount', 'valid_from', 'valid_to', 'is_active']
    list_filter = ['is_active', 'valid_from', 'valid_to']
    search_fields = ['code']

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'address', 'city', 'state', 'country', 'zip_code']
    search_fields = ['user__username', 'user__email', 'address', 'city', 'state', 'country']

# OrderItem is not registered directly as it's included as an inline in OrderAdmin