from django.http import JsonResponse
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import MovieView, MovieDetailView, TvShowView, TvShowDetailView, GenresView

def api_root(request):
    return JsonResponse({"message": "Welcome to the API!"})

urlpatterns = [
    path('', api_root),
    path('movies/', MovieView.as_view(), name='movies'),
    path('movies/<int:movie_id>/', MovieDetailView.as_view(), name='movie_detail'),
    path('tv-shows/', TvShowView.as_view(), name='tv_shows'),
    path('tv-shows/<int:tvshow_id>/', TvShowDetailView.as_view(), name='tv_show_detail'),
    path('genres/', GenresView.as_view(), name='genres'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
