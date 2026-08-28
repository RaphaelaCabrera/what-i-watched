from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import Movie, TvShow, Genre
from .serializers import MovieSerializer, TvShowSerializer, GenreSerializer


class MovieView(APIView):
    @swagger_auto_schema(
        operation_description="Retrieve a list of movies",
        responses={200: MovieSerializer(many=True)},
    )
    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new movie",
        request_body=MovieSerializer,
        responses={201: MovieSerializer},
    )
    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MovieDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Update a specific movie",
        request_body=MovieSerializer,
        responses={
            200: MovieSerializer, 
            404: openapi.Response('Movie not Found'),
        },
    )
    def patch(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MovieSerializer(movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete a specific movie",
        responses={204: openapi.Response('No Content')},
    )
    def delete(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not Found"}, status=status.HTTP_404_NOT_FOUND)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TvShowView(APIView):
    @swagger_auto_schema(
        operation_description="Retrieve a list of TV shows",
        responses={200: TvShowSerializer(many=True)},
    )
    def get(self, request):
        tv_shows = TvShow.objects.all()
        serializer = TvShowSerializer(tv_shows, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new TV show",
        request_body=TvShowSerializer,
        responses={201: TvShowSerializer},
    )
    def post(self, request):
        serializer = TvShowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TvShowDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Update a specific TV show",
        request_body=TvShowSerializer,
        responses={
            200: TvShowSerializer, 
            404: openapi.Response('TV Show not Found'),
        },
    )
    def patch(self, request, tvshow_id):
        try:
            tv_show = TvShow.objects.get(id=tvshow_id)
        except TvShow.DoesNotExist:
            return Response({"message": "TV Show not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TvShowSerializer(tv_show, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete a specific TV show",
        responses={204: openapi.Response('No Content')},
    )
    def delete(self, request, tvshow_id):
        try:
            tv_show = TvShow.objects.get(id=tvshow_id)
        except TvShow.DoesNotExist:
            return Response({"message": "TV Show not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        tv_show.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class GenresView(APIView):
    @swagger_auto_schema(
        operation_description="Retrieve a list of genres",
        responses={200: openapi.Response('List of genres')},
    )
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
