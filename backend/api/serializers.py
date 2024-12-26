from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Building, Note, BuildingProductionMaterial, BuildingBuildMaterial


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]

        extra_kwargs = {"author": {"read_only": True}}


class ProductMaterialSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="material.name")
    image = serializers.CharField(source="material.image")

    class Meta:
        model = BuildingProductionMaterial
        fields = ["id", "name", "image", "production_speed"]


class PriceMaterialSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="material.name")
    image = serializers.CharField(source="material.image")

    class Meta:
        model = BuildingBuildMaterial
        fields = ["id", "name", "image", "count"]


class BuildingSerializer(serializers.ModelSerializer):
    producted_materials = ProductMaterialSerializer(many=True)
    building_materials = PriceMaterialSerializer(many=True)

    class Meta:
        model = Building
        fields = ["id", "name", "image", "building_materials", "producted_materials"]
