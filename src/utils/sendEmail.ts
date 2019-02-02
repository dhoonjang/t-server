import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (/*to: string */subject: string, text: string) => {
    const emailData = {
        from: "dhoonjang@gmail.com",
        to: "dhoonjang@gmail.com",
        subject,
        text
    }

    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (name: string, key: string) => {
    const emailSubject = `Hello! ${name}, please verify your email **/${key}/**`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
};