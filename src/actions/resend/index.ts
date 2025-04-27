import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Your Portfolio <newsletter@yourdomain.com>",
      to: email,
      subject: "Welcome to My Portfolio Newsletter",
      react: WelcomeEmail({ userEmail: email }),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}
