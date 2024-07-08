# Generated by Django 5.0.1 on 2024-07-07 10:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0006_remove_product_old_price_product_sales_price_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="productimages",
            name="product",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="product_images",
                to="store.product",
            ),
        ),
    ]
