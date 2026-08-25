export function getMediaStatus(status: string): string {
  switch (status) {
    case "Plan to Watch":
      return "Planejado";
    case "Watching":
      return "Assistindo";
    case "Completed":
      return "Concluído";
    case "On Hold":
      return "Em espera";
    case "Dropped":
      return "Abandonado";
    default:
      return status;
  }
}

export function getMediaStatusList(): [string, string][] {
  return [
    ["Plan to Watch", "Planejado"],
    ["Watching", "Assistindo"],
    ["Completed", "Concluído"],
    ["On Hold", "Em espera"],
    ["Dropped", "Abandonado"],
  ];
}