from rest_framework import serializers
from .models import Movie, TvShow, Genre


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
  