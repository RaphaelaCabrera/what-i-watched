export function getMediaStatus(status: string, t: (key: string) => string): string {

  switch (status) {
    case "Plan to Watch":
      return t("status.planToWatch");
    case "Watching":
      return t("status.watching");
    case "Completed":
      return t("status.completed");
    case "On Hold":
      return t("status.onHold");
    case "Dropped":
      return t("status.dropped");
    default:
      return status;
  }
}

export function getMediaStatusList(t: (key: string) => string): [string, string][] {

  return [
    ["Plan to Watch", t("status.planToWatch")],
    ["Watching", t("status.watching")],
    ["Completed", t("status.completed")],
    ["On Hold", t("status.onHold")],
    ["Dropped", t("status.dropped")],
  ];
}

export function getMediaGenre(genre: string, t: (key: string) => string): string {
  switch (genre) {
    case "Action":
      return t("genres.action");
    case "Adventure":
      return t("genres.adventure");
    case "Animation":
      return t("genres.animation");
    case "Anime":
      return t("genres.anime");
    case "Biography":
      return t("genres.biography");
    case "Comedy":
      return t("genres.comedy");
    case "Crime":
      return t("genres.crime");
    case "Documentary":
      return t("genres.documentary");
    case "Drama":
      return t("genres.drama");
    case "Family":
      return t("genres.family");
    case "Fantasy":
      return t("genres.fantasy");
    case "History":
      return t("genres.history");
    case "Horror":
      return t("genres.horror");
    case "Mystery":
      return t("genres.mystery");
    case "Musical":
      return t("genres.musical");
    case "Romance":
      return t("genres.romance");
    case "Sci-Fi":
      return t("genres.sciFi");
    case "Thriller":
      return t("genres.thriller");
    case "War":
      return t("genres.war");
    case "Western":
      return t("genres.western");
    default:
      return genre;
  }
}