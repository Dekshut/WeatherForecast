export function getWindDirection(angle) {
    if (angle >= 0 && angle <= 22.5 || angle > 337.5 && angle <= 360) return 'N';
    else if (angle > 22.5 && angle <= 67.5) return 'NE';
    else if (angle > 67.5 && angle <= 112.5) return 'E';
    else if (angle > 112.5 && angle <= 175.5) return 'SE';
    else if (angle > 175.5 && angle <= 202.5) return 'S';
    else if (angle > 202.5 && angle <= 247.5) return 'WS';
    else if (angle > 247.5 && angle <= 292.5) return 'W';
    else if (angle > 292.5 && angle <= 337.5) return 'NW';
}