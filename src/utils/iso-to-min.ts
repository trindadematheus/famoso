export function isoToMinutesSeconds(isoString: string) {
    const regex = /^PT(?:(\d+)M)?(?:(\d+)S)?$/;
    const match = isoString.match(regex);

    if (!match) {
        throw new Error("A string não está em um formato ISO válido");
    }

    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;
    const totalSeconds = minutes * 60 + seconds;

    return {
        minutes,
        seconds,
        totalSeconds
    };
}