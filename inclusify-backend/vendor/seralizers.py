from .models import Vendor
from rest_framework import serializers
from store.models import Product

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vendor
        fields='__all__'

        def create(self, validated_data):
            instance=self.Meta.model(**validated_data)
            instance.save()
            return instance


class VendorProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product  # Use your Product model
        fields = '__all__'  # Specify the fields that a vendor can set while creating a product            


            