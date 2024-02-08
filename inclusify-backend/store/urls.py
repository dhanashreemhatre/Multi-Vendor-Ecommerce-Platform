from django.urls import path
from .views import All_products,ProductDetailAPIView,All_Categories

app_name="store"

urlpatterns=[
    path("products/",All_products.as_view(),name="products"),
    path("categories/",All_Categories.as_view()),
    path('products/<int:pk>/',ProductDetailAPIView.as_view())
]