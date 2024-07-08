from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem, Coupon, Payment, Account, Product
from .serilizers import OrderSerializer, PaymentSerializer

class CreateOrderView(APIView):
    def post(self, request):
        try:
            user_email = request.data.get('email')
            user = Account.objects.get(email=user_email)
            
            order_data = {
                'user': user.id,
                'total_amount': request.data.get('total_amount'),
                'status': 'PENDING',
                'items': request.data.get('items', []),
                'shipping_address': request.data.get('shipping_address', {}),
                'coupon': request.data.get('coupon', None)
            }
            print(order_data)
            
            order_serializer = OrderSerializer(data=order_data)
            
            if order_serializer:
                print("is valid")
                order_serializer.save()
                return Response("Success", status=status.HTTP_201_CREATED)
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        
        
        except Account.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ApplyCouponView(APIView):
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            coupon_code = request.data.get('coupon_code')
            
            try:
                coupon = Coupon.objects.get(code=coupon_code, is_active=True)
            except Coupon.DoesNotExist:
                return Response({"error": "Invalid or inactive coupon"}, status=status.HTTP_400_BAD_REQUEST)

            # Apply discount
            discount_amount = order.total_amount * (coupon.discount / 100)
            order.total_amount -= discount_amount
            order.coupon = coupon
            order.save()

            return Response({"message": "Coupon applied successfully", "new_total": order.total_amount})
        
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
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