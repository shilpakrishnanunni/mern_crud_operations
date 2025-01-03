import moment from "moment-timezone";
import nodemailer from "nodemailer";

const getTimeZone = (): string => {
    const timeZone: string | undefined = process.env.TIME_ZONE;
    if (!timeZone) {
        throw new Error('TIME_ZONE environment variable is not set');
    }
    return timeZone;
}

export const convertToLocalTZ = (utcTimestamp: Date) => {
    const timeZone: string = getTimeZone();
    return moment.utc(utcTimestamp).tz(timeZone).format("YYYY-MM-DD HH:mm");
}

export const convertToUTC = (localTZTimestamp: string) => {
    const timeZone: string = getTimeZone();
    return moment.tz(localTZTimestamp, timeZone).utc().format();
}

export const mailSender = async (email: string, title: string, body: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            // secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
        });
        let info = await transporter.sendMail({
            from: process.env.FROM_MAIL,
            to: email,
            subject: title,
            html: body
        });
        return info;
    } catch (error) {
        console.log("Error from mailSender",error);
        throw error;
    }
}
