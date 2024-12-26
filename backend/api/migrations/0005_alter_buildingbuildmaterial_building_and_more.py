# Generated by Django 5.1.4 on 2024-12-26 17:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_add_wood_camp_building"),
    ]

    operations = [
        migrations.AlterField(
            model_name="buildingbuildmaterial",
            name="building",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="building_materials",
                to="api.building",
            ),
        ),
        migrations.AlterField(
            model_name="buildingproductionmaterial",
            name="building",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="producted_materials",
                to="api.building",
            ),
        ),
    ]