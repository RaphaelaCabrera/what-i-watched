# signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Movie, TvShow

@receiver(post_delete, sender=Movie)
def delete_movie_cover(sender, instance, **kwargs):
    if instance.cover_image:
        instance.cover_image.delete(save=False)

@receiver(post_delete, sender=TvShow)
def delete_tvshow_cover(sender, instance, **kwargs):
    if instance.cover_image:
        instance.cover_image.delete(save=False)
