from django.urls import path
from .views import VendorRegistratonAPIView,VendorProductCreateAPIView

app_name="vendor"
urlpatterns=[
    path("registration/",VendorRegistratonAPIView.as_view()),   
      path('products/create/', VendorProductCreateAPIView.as_view(), name='vendor-product-create'),
]