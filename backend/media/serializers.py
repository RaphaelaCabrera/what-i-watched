from rest_framework import serializers
from django.core.files.base import ContentFile
from .models import Movie, TvShow, Genre
from .utils.file_utils import save_cover_image



class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Genre.objects.all(),
        write_only=True
    )

    genre_details = GenreSerializer(
        source='genres',
        many=True,
        read_only=True
    )

    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'status',
            'rate',
            'cover_image',
            'duration',
            'release_year',
            'genres',
            'genre_details',
        ]

    def get_genres(self, obj):
        return [genre.name for genre in obj.genres.all()]


class MovieCoverImageSerializer(serializers.ModelSerializer):
    cover_image = serializers.FileField(required=True)

    class Meta:
        model = Movie
        fields = ['cover_image']

    def update(self, instance, validated_data):
        cover_image = validated_data.get('cover_image')
        return save_cover_image(instance, cover_image, 'movie')


class TvShowSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Genre.objects.all(),
        write_only=True
    )

    genre_details = GenreSerializer(
        source='genres',
        many=True,
        read_only=True
    )

    class Meta:
        model = TvShow
        fields = [
            'id',
            'title',
            'status',
            'rate',
            'cover_image',
            'episodes',
            'seasons',
            'genres',
            'genre_details',
        ]


class TvShowCoverImageSerializer(serializers.ModelSerializer):
    cover_image = serializers.FileField(required=True)

    class Meta:
        model = TvShow
        fields = ['cover_image']

    def update(self, instance, validated_data):
        cover_image = validated_data.get('cover_image')
        return save_cover_image(instance, cover_image, 'tvshow')
    