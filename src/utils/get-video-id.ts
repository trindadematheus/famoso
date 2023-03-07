export function getYouTubeId(url: string) {
    return url.split("v=")[1];
}