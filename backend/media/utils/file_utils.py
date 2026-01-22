from django.conf import settings
from rest_framework import serializers


def save_cover_image(instance, cover_image, media_type):
    if not cover_image:
            raise serializers.ValidationError({"cover_image": "This field is required."})
        
    extension = cover_image.name.split('.')[-1].lower()
    if extension not in settings.ALLOWED_IMAGE_EXTENSIONS:
        raise serializers.ValidationError({"cover_image": "Invalid file extension. Only jpg and png are allowed."})

    if instance.cover_image:
        instance.cover_image.delete(save=False)

    filename = f"{media_type}_{instance.id}.{extension}"

    instance.cover_image.save(filename, cover_image, save=True)
    return instance