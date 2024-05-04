from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serilizers import ProductSerializer,CategorySerializer,CartSerializer,CartItemSerializer
from .models import Product,Category,CartItem,Cart
from rest_framework import status
from .models import Account
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class All_products(APIView):
    def get(self,request):
        product=Product.objects.all().order_by('?')
        serializer=ProductSerializer(product,many=True)
        return Response(serializer.data)
    
class All_Categories(APIView):
    def get(self,request):
        category=Category.objects.all().order_by('?')
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)

class ProductDetailAPIView(APIView):
    def get(self,request,pk):
        try:
            product_detail=Product.objects.get(pk=pk)
            serailizer=ProductSerializer(product_detail)
            return Response(serailizer.data)
        except:
            return Response({'error':'Product not found'},status=status.HTTP_404_NOT_FOUND)
        
class AddToCartAPIView(APIView):
    def post(self, request, pk):
        try:
            # Retrieve the product
            pid = request.data.get('pid')
            user_id = request.data.get('userId')
            user=Account.objects.get(email=user_id)
            product = Product.objects.get(pid=pid)
            # Create or get the cart for the current user
            cart, created = Cart.objects.get_or_create(user=user)
            print(cart)
            # Check if the product is already in the cart
            if cart.items.filter(product=product).exists():
                return Response({'message': 'Product is already in the cart.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Add the product to the cart
            cart_item = cart.items.create(product=product, quantity=1)
            
            # Serialize the cart item
            serializer = CartSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartAPIView(APIView):
    def get(self, request):
        try:
            user_email = request.headers['Authorization'] 
            print(user_email) # Get the user ID from headers
            user = Account.objects.get(email=user_email)
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)
            serialized_cart_items = CartItemSerializer(cart_items, many=True).data
            return Response(serialized_cart_items)
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RemoveFromCartAPIView(APIView):
    def delete(self, request, pk):  # Use 'delete' method instead of 'post' for removing items
        try:
            user_email = request.headers['Authorization']
            user = Account.objects.get(email=user_email)
            cart = Cart.objects.get(user=user)
            product = Product.objects.get(pk=pk)
            cart_item = CartItem.objects.get(cart=cart, product=product)  # Get the specific cart item
            cart_item.delete()  # Delete the cart item

            return Response({'message': 'Product removed from cart successfully.'}, status=status.HTTP_204_NO_CONTENT)
        
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
