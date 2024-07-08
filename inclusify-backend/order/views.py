from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem, Coupon, Payment, Account, Product,CouponUsage
from .serilizers import OrderSerializer, PaymentSerializer,ShippingAddressSerializer
from store.models import Cart,CartItem

class CreateOrderView(APIView):
    def post(self, request):
        try:
            user_email = request.data.get('email')
            user = Account.objects.get(email=user_email)
            
            # Extract and validate shipping address data
            shipping_address_data = request.data.get('shipping_address', {})
            shipping_address_data['user'] = user.id  # Set the user for the shipping address
            
            shipping_address_serializer = ShippingAddressSerializer(data=shipping_address_data)
            if not shipping_address_serializer.is_valid():
                return Response(shipping_address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            shipping_address = shipping_address_serializer.save()

            # Prepare order data
            order_data = {
                'user': user.id,
                'total_amount': request.data.get('total_amount'),
                'status': 'PENDING',
                'items': request.data.get('items', []),
                'shipping_address': shipping_address.id,  # Use the created shipping address instance
                'coupon': request.data.get('coupon', None)
            }
            
            order_serializer = OrderSerializer(data=order_data)
            if order_serializer.is_valid():
                order_serializer.save()
                
                # Handle deleting products in cart
                cart = Cart.objects.get(user=user)
                for item in order_data['items']:
                    product_id = item['product']
                    products_in_cart = CartItem.objects.filter(product=product_id, cart=cart)
                    products_in_cart.delete()

                return Response("Success", status=status.HTTP_201_CREATED)
            
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ApplyCouponView(APIView):
    def post(self, request):
        user_id = request.data.get('userId')
        user=Account.objects.get(email=user_id)
        
        try:
            coupon_code = request.data.get('coupon_code')
            total_amount=request.data.get('total_amount')
            
            try:
                coupon = Coupon.objects.get(code=coupon_code, is_active=True)
            except Coupon.DoesNotExist:
                return Response({"error": "Invalid or inactive coupon"}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the coupon has already been used by the user
            if CouponUsage.objects.filter(user=user, coupon=coupon).exists():
                return Response({"error": "Coupon has already been used by this user"}, status=status.HTTP_400_BAD_REQUEST)

            # Apply discount
            discount_amount = total_amount * (coupon.discount / 100)
            total_amount -= discount_amount

            # Record the coupon usage
            CouponUsage.objects.create(user=user, coupon=coupon)

            return Response({"message": "Coupon applied successfully", "new_total": total_amount})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
   
class ProcessPaymentView(APIView):
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            
            if order.status != 'PENDING':
                return Response({"error": "This order is not pending payment"}, status=status.HTTP_400_BAD_REQUEST)

            payment_data = {
                'order': order.id,
                'amount': order.total_amount,
                'payment_method': request.data.get('payment_method'),
                'transaction_id': request.data.get('transaction_id'),
                'status': 'COMPLETED'
            }
            
            payment_serializer = PaymentSerializer(data=payment_data)
            if payment_serializer.is_valid():
                payment = payment_serializer.save()
                
                # Update order status
                order.status = 'PAID'
                order.save()

                return Response({"message": "Payment processed successfully"}, status=status.HTTP_200_OK)
            return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)