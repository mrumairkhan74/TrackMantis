function timeSince(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    if (days > 0) {
        return `${days} day(s) ago`;
    } else if (hours > 0) {
        return `${hours} hour(s) ago`;
    } else {
        return `just now`;
    }
}
