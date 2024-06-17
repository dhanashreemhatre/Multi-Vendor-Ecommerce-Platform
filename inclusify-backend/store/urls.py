from django.urls import path
from .views import All_products,ProductDetailAPIView,All_Categories,AddToCartAPIView,CartAPIView,ProductReviewView,RemoveFromCartAPIView,ProductFromThisCategoryApi

app_name="store"

urlpatterns=[
    path("products/",All_products.as_view(),name="products"),
    path("categories/",All_Categories.as_view()),
    path("categories/<str:pk>",ProductFromThisCategoryApi.as_view()),
    path('products/<str:pk>/',ProductDetailAPIView.as_view()),
    path('add-to-cart/<str:pk>/',AddToCartAPIView.as_view()),
    path('remove-from-cart/<str:pk>/',RemoveFromCartAPIView.as_view()),
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('review/<str:pk>/',ProductReviewView.as_view()),
    
]
