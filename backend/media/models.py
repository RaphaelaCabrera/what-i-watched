from django.db import models
from .utils.enums import Status


class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    

class Media(models.Model):
    title = models.CharField(max_length=255)
    genres = models.ManyToManyField('Genre', blank=True, null=True)
    status = models.CharField(max_length=50, choices=Status.choices(), default=Status.PLAN_TO_WATCH.value)
    rate = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    cover_image = models.ImageField(upload_to='cover_images/', null=True, blank=True)

    def __str__(self):
        return self.title
    

class Movie(Media):
    duration = models.PositiveIntegerField(help_text="Duration in minutes", null=True, blank=True)
    release_year = models.PositiveIntegerField(null=True, blank=True)


class TvShow(Media):
    episodes = models.PositiveIntegerField(null=True, blank=True)
    seasons = models.PositiveIntegerField(null=True, blank=True)