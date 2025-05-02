import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
console.log("Resend API Key available:", apiKey ? "Yes (redacted)" : "No");

const resend = new Resend(apiKey);

export async function sendWelcomeEmail(email: string) {
  console.log("Attempting to send welcome email to:", email);

  try {
    if (!apiKey) {
      console.error("Missing Resend API key!");
      return { success: false, error: "API key not configured" };
    }

    console.log("Sending email via Resend...");
    const { data, error } = await resend.emails.send({
      from: "Raj Vadeghar <newsletter@r44j.dev>",
      to: email,
      subject: "Welcome to R44j Newsletter",
      react: WelcomeEmail({ userEmail: email }),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}
