const getMsInDays = (days) => {
    return days * 24 * 60 * 60 * 1000;
}

const getMsInHours = (hours) => {
    return hours * 60 * 60 * 1000;
}

const getMsInMinutes = (minutes) => {
    return minutes * 60 * 1000;
}

const getMsInSeconds = (seconds) => {
    return seconds * 1000;
}

module.exports = {
    getMsInDays,
    getMsInHours,
    getMsInMinutes,
    getMsInSeconds
}