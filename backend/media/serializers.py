from rest_framework import serializers
from django.core.files.base import ContentFile
from .models import Movie, TvShow
from .utils.file_utils import save_cover_image


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
        return save_cover_image(instance, cover_image, 'movie')


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
        return save_cover_image(instance, cover_image, 'tvshow')