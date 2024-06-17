from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serilizers import ProductSerializer,CategorySerializer,CartSerializer,MultipleProductSerialzer,CartItemSerializer,ProductReviewSerializer
from .models import Product,Category,CartItem,Cart,ProductReview
from rest_framework import status
from .models import Account
from rest_framework.permissions import IsAuthenticated
import logging

logger = logging.getLogger(__name__)

# Create your views here.
class All_products(APIView):
    def get(self,request):
        product=Product.objects.all().order_by('?')
        serializer=MultipleProductSerialzer(product,many=True)
        return Response(serializer.data)
    
class All_Categories(APIView):
    def get(self,request):
        category=Category.objects.all().order_by('?')
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)
    
class ProductFromThisCategoryApi(APIView):
    def get(self, request, pk):
        try:
            category = Category.objects.get(cid=pk)
            products = Product.objects.filter(categories=category)
            category_serializer = CategorySerializer(category)  # Serialize category
            product_serializer = MultipleProductSerialzer(products, many=True)  # Serialize products
            data = {
                'category': category_serializer.data,  # Include serialized category data
                'products': product_serializer.data  # Include serialized products data
            }
            return Response(data)
        except Category.DoesNotExist:
            return Response({'error': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'error': 'Products not found for this category'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ProductDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            logger.info(f"Requested PID: {pk}")
            product_detail = Product.objects.get(pid=pk)
            product_serializer = ProductSerializer(product_detail)
            product_review = ProductReview.objects.filter(product=product_detail)
            product_review_serializer = ProductReviewSerializer(product_review, many=True)
            data = {
                'product': product_serializer.data,
                'review': product_review_serializer.data
            }
            logger.info(f"Response Data: {data}")
            return Response(data)
        except Product.DoesNotExist:
            logger.error(f"Product with PID {pk} not found.")
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ProductReviewView(APIView):
    def post(self,request,pk):
        try:
            pid=request.data.get('pid')
            email=request.data.get('email')
            review=request.data.get('review')
            rating=request.data.get('rating')
            subject=request.data.get('subject')
            user=Account.objects.get(email=email)
            product=Product.objects.get(pid=pk)
            
            #create a review
            review_obj=ProductReview.objects.create(user=user,product=product,review=review,rating=rating,subject=subject)
            return Response("Success", status=status.HTTP_201_CREATED)
        
        except Product.DoesNotExist:
            return Response({'error' : 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, pk):
        try:
            pid = request.data.get('pid')
            email = request.data.get('email')
            review = request.data.get('review')
            rating = request.data.get('rating')
            subject = request.data.get('subject')

            user = Account.objects.get(email=email)
            product = Product.objects.get(pid=pk)

            # Update review
            try:
                review_obj = ProductReview.objects.get(user=user, product=product)
            except ProductReview.DoesNotExist:
                return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

            review_data = {
                'subject': subject,
                'review': review,
                'rating': rating
            }
            review_serializer = ProductReviewSerializer(review_obj, data=review_data, partial=True)

            if review_serializer.is_valid():
                review_serializer.save()
                return Response({'message': 'Success'}, status=status.HTTP_200_OK)
            return Response(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk):
        try:
            email = request.data.get('email')
            user = Account.objects.get(email=email)
            product = Product.objects.get(pid=pk)

            # Delete review
            try:
                review_obj = ProductReview.objects.get(user=user, product=product)
                review_obj.delete()
                return Response({'message': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
            except ProductReview.DoesNotExist:
                return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class AddToCartAPIView(APIView):
    def post(self, request, pk):
        try:
            print(pk)
            # Retrieve the product
            pid = request.data.get('pid')
            user_id = request.data.get('userId')
            user=Account.objects.get(email=user_id)
            product = Product.objects.get(pid=pk)
            # Create or get the cart for the current user
            cart, created = Cart.objects.get_or_create(user=user)
            print(cart)
            # Check if the product is already in the cart
            if cart.items.filter(product=product).exists():
                return Response({'message': 'Product is already in the cart.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Add the product to the cart
            cart_item = cart.items.create(product=product, quantity=1)
            
           
            return Response("Success", status=status.HTTP_201_CREATED)
        
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
