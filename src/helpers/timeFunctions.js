export function hoursToString(hours) {
    if (hours < 10) return `0${hours}`;
    return hours;
}

export function minutesToString(minutes) {
    if (minutes < 10) return `0${minutes}`;
    return minutes;
}

export function getTimeDescr(hours, minutes) {
    if (hours >= 12 && minutes >= 0) return 'PM';
    return 'AM';
}