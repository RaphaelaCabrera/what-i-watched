from django.db import migrations


def add_genres(apps, schema_editor):
    Genre = apps.get_model("media", "Genre")

    genres = [
        "History",
        "Musical",
    ]

    for name in genres:
        Genre.objects.get_or_create(name=name)


class Migration(migrations.Migration):

    dependencies = [
        ("media", "0002_populate_genres"),
    ]

    operations = [
        migrations.RunPython(add_genres),
    ]