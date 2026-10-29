import { Resend } from "resend";
import dotenv from "dotenv"
dotenv.config()

export async function sendWelcomeEmail(to, name) {
    const resend = new Resend(process.env.RESEND_API);
    const EMAIL_FROM = process.env.EMAIL_FROM;
    const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to, // string or array of strings
        // cc: ,
        // replyTo: ,
        subject: "Welcome aboard!",
        html: `
    <h2>Hi ${name},</h2>
    <p>Thanks for signing up. Glad to have you here.</p>
  `,
  text: "This is text"
    });

    if (error) {
        console.error("Resend error:", error);
        throw new Error(error);
    }

    return data; // { id: "..." }
}