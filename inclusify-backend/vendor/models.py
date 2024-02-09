from django.db import models
from accounts.models import Account

# Create your models here.
class Vendor(models.Model):
    name=models.CharField(max_length=255,default="vendor",null=True)
    user=models.OneToOneField(Account,on_delete=models.CASCADE,null=True)
    comapany_name=models.CharField(max_length=50,null=True)
    address=models.TextField(default="this is my address")
    contact=models.CharField(max_length=20,null=True)

    
    