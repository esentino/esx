from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name ="notes")

    def __str__(self) -> str:
        return self.title

class Material(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.CharField(max_length=255)


class Building(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.CharField(max_length=255)


class BuildingBuildMaterial(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="building_materials")
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    count = models.IntegerField()


class BuildingProductionMaterial(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="producted_materials")
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    production_speed = models.FloatField(help_text="production per minute")
