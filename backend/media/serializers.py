from rest_framework import serializers
from django.core.files.base import ContentFile
from .models import Movie, TvShow


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class MovieCoverImageSerializer(serializers.ModelSerializer):
    cover_image = serializers.FileField(required=True)

    class Meta:
        model = Movie
        fields = ['cover_image']

    def update(self, instance, validated_data):
        cover_image = validated_data.get('cover_image')

        if not cover_image:
            raise serializers.ValidationError({"cover_image": "This field is required."})
        
        if instance.cover_image:
            instance.cover_image.delete(save=False)

        django_file = ContentFile(cover_image.read(), name=cover_image.name)

        instance.cover_image.save(cover_image.name, django_file, save=True)
        return instance


class TvShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = TvShow
        fields = '__all__'


class TvShowCoverImageSerializer(serializers.ModelSerializer):
    cover_image = serializers.FileField(required=True)

    class Meta:
        model = TvShow
        fields = ['cover_image']

    def update(self, instance, validated_data):
        cover_image = validated_data.get('cover_image')

        if not cover_image:
            raise serializers.ValidationError({"cover_image": "This field is required."})
        
        if instance.cover_image:
            instance.cover_image.delete(save=False)

        django_file = ContentFile(cover_image.read(), name=cover_image.name)

        instance.cover_image.save(cover_image.name, django_file, save=True)
        return instance