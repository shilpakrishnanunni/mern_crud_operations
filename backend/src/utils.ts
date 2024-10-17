import moment from "moment-timezone";

const getTimeZone = (): string => {
    const timeZone: string | undefined = process.env.TIME_ZONE;
    if (!timeZone) {
        throw new Error('TIME_ZONE environment variable is not set');
    }
    return timeZone;
}

export const convertToLocalTZ = (utcTimestamp: Date) => {
    const timeZone: string = getTimeZone();
    return moment.utc(utcTimestamp).tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
}

export const convertToUTC = (localTZTimestamp: string) => {
    const timeZone: string = getTimeZone();
    return moment.tz(localTZTimestamp, timeZone).utc().format();
}

