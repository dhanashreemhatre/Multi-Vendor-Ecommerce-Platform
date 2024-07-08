from django.urls import path
from .views import CreateOrderView, ApplyCouponView, ProcessPaymentView

app_name="order"

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('apply-coupon/', ApplyCouponView.as_view(), name='apply-coupon'),
    path('process-payment/<int:order_id>/', ProcessPaymentView.as_view(), name='process-payment'),
]