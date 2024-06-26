from django.http import JsonResponse
from rest_framework.response import Response
from django.shortcuts import redirect
from django.conf import settings
import os 
import sys
sys.path.append(os.getcwd())
from .serializer import AccountSerializers
from .models import Account
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
User=settings.AUTH_USER_MODEL
import datetime,jwt
from django.contrib.auth import logout,authenticate
from django.contrib.auth import login as django_login 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
# Create your views here.


class RegisterView(APIView):
    def post(self,request):
        serializer=AccountSerializers(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            
            # Check if user with provided username or email already exists
            if Account.objects.filter(username=username).exists() or Account.objects.filter(email=email).exists():
                return Response({'error': 'User with provided username or email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save()
            
            # User Activation
            current_site = get_current_site(request)
            mail_subject = 'Please activate your account'
            message = render_to_string('account_verification_email.html', {
                'user': user.username,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            to_email = user.email
            send_email = EmailMessage(mail_subject, message, to=[to_email])
            send_email.send()

            return Response({'message': 'Activation email sent to your email address.'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')  # Assuming 'role' indicates if the user is a vendor

        try:
            user = Account.objects.get(email=email)
        except Account.DoesNotExist:
            raise AuthenticationFailed("User Not Found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password!")

        if role=="vendor":  # Check if the user selected the role as vendor
            if not user.is_vendor:  # Check if the user is actually a vendor
                raise AuthenticationFailed("User is not a vendor")

        # Check if the user account is active
        if not user.is_active:
            raise AuthenticationFailed("User account is not activated")

        # Authenticate the user
        authenticated_user = authenticate(email=email, password=password)
        if not authenticated_user:
            raise AuthenticationFailed("Authentication failed")

        # Use Django's login method to log in the user
        django_login(request, authenticated_user)

        # Generate JWT token (as you did before)
        # Generate JWT token
        payload = {
            'id': user.id,
             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(),
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        request.session['jwt'] = token
        
        return Response({'token': token})




@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request)
    response = JsonResponse({"message": "Logged out successfully"})
    response.delete_cookie('jwt')  # Remove the JWT token cookie
    return response 

def activate(request,uidb64,token):
   try:
      uid=urlsafe_base64_decode(uidb64).decode()
      user=Account._default_manager.get(pk=uid)
   except(TypeError,ValueError,OverflowError,Account.DoesNotExist):
      user=None
   if user is not None and default_token_generator.check_token(user,token):
      user.is_active=True
      user.save()
      return redirect('accounts:login')
   else:
      return redirect('accounts:sign-up')


class Forget_Password(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        try:
            user=Account.objects.get(email__exact=email)

            #reset password mail
            current_site=get_current_site(request)
            mail_subject='Reset Your Password'
            message=render_to_string('mail_templates/reset_password.html',
                                    {'user':user,
                                        'domain':current_site,
                                        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                                        'token':default_token_generator.make_token(user),})
            to_email=email
            send_email=EmailMessage(mail_subject,message,to=[to_email])
            send_email.send()
            return redirect('accounts:login')

        except ObjectDoesNotExist:
            return redirect("accounts:forget_password")
        

def reset_password_validate(request,uidb64,token):
   try:
      uid=urlsafe_base64_decode(uidb64).decode()
      user=Account._default_manager.get(pk=uid)
   except(TypeError,ValueError,OverflowError,Account.DoesNotExist):
      user=None
   if user is not None and default_token_generator.check_token(user,token):
      request.session['uid']=uid
      return redirect('accounts:resetPassword')
   else:
      return redirect('accounts:login')

class ResetPassword(APIView):
    def post(self,request):
        password=request.data.get('password')
        confirm_password=request.data.get('confirm_password')

        if password == confirm_password:
            uid=request.session.get('uid')
            user=Account.objects.get(pk=uid)
            user.set_password(password)
            user.save()
            return redirect('accounts:login')
        else:
            return redirect('accounts:resetPassword')



{
"email":"mhatredhanashree682@gmail.com",
"password":"124",
"role":"vendor"

}
