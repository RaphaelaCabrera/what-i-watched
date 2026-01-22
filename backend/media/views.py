from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.http import HttpResponse, FileResponse
from puremagic import magic_string
from .models import Movie, TvShow
from .serializers import MovieSerializer, MovieCoverImageSerializer, TvShowSerializer, TvShowCoverImageSerializer


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
        operation_description="Retrieve details of a specific movie",
        responses={
            200: MovieSerializer,
            404: openapi.Response('Movie not Found'),
        },
    )
    def get(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MovieSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    

class MovieCoverImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_description="Retrieve a movie's cover image",
        responses={
            200: openapi.Response(
                description='Cover image retrieved successfully',
                schema=openapi.Schema(type=openapi.TYPE_STRING, format="binary"),
            ),
            404: "Movie or cover image not found",
            500: "Failed to open cover image file",
        },
    )
    def get(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return HttpResponse('{"message": "Movie not found"}',content_type="application/json",status=status.HTTP_404_NOT_FOUND)

        if not movie.cover_image:
            return HttpResponse('{"message": "No cover image found"}',content_type="application/json",status=status.HTTP_404_NOT_FOUND)

        return FileResponse(movie.cover_image, as_attachment=True, filename="cover_image.jpg")

    @swagger_auto_schema(
        operation_description="Upload or update a movie's cover image",
        manual_parameters=[
            openapi.Parameter(
                name='cover_image',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='Cover image file',
                required=True,
            ),
        ],
        responses={
            200: openapi.Response('Cover image updated successfully'),
            400: openapi.Response('Bad Request'),
            404: openapi.Response('Movie not Found'),
        },
    )
    def patch(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        cover_image = request.FILES.get('cover_image')
        if not cover_image:
            return Response({"message": "No cover image provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = MovieCoverImageSerializer(movie, data={'cover_image': cover_image}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cover image updated successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        operation_description="Retrieve details of a specific TV show",
        responses={
            200: TvShowSerializer,
            404: openapi.Response('TV Show not Found'),
        },
    )
    def get(self, request, tvshow_id):
        try:
            tv_show = TvShow.objects.get(id=tvshow_id)
        except TvShow.DoesNotExist:
            return Response({"message": "TV Show not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TvShowSerializer(tv_show)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
    

class TvShowCoverImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_description="Retrieve a TV show's cover image",
        responses={
            200: openapi.Response(
                description='Cover image retrieved successfully',
                schema=openapi.Schema(type=openapi.TYPE_STRING, format="binary"),
            ),
            404: openapi.Response('TV Show not Found'),
        },
    )
    def get(self, request, tvshow_id):
        try:
            tv_show = TvShow.objects.get(id=tvshow_id)
        except TvShow.DoesNotExist:
            return Response({"message": "TV Show not Found"}, status=status.HTTP_404_NOT_FOUND)

        cover_image = tv_show.cover_image
        if not cover_image:
            return Response({"message": "No cover image found"}, status=status.HTTP_404_NOT_FOUND)

        return FileResponse(tv_show.cover_image, as_attachment=True, filename="cover_image.jpg")

    @swagger_auto_schema(
        consumes=['multipart/form-data'],
        operation_description="Upload or update a TV show's cover image",
        manual_parameters=[
            openapi.Parameter(
                name='cover_image',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description='Cover image file',
                required=True,
            ),
        ],
        responses={
            200: TvShowSerializer,
            400: openapi.Response('Bad Request'),
            404: openapi.Response('TV Show not Found'),
        },
    )
    def patch(self, request, tvshow_id):
        try:
            tv_show = TvShow.objects.get(id=tvshow_id)
        except TvShow.DoesNotExist:
            return Response({"message": "TV Show not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        cover_image = request.FILES.get('cover_image')
        if not cover_image:
            return Response({"message": "No cover image provided"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TvShowCoverImageSerializer(tv_show, data={'cover_image': cover_image}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cover image updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
