"use server";

import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "../resend";

export async function addEmail(formData: FormData) {
  console.log("Newsletter subscription initiated");
  const supabase = await createClient();
  const email = formData.get("email") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log("Invalid email format:", email);
    return { error: "Please enter a valid email address." };
  }

  console.log("Checking if email already exists:", email);
  const { data: existingSubscriber, error: lookupError } = await supabase
    .from("subscribers")
    .select("email")
    .eq("email", email)
    .single();

  if (lookupError && lookupError.code !== "PGRST116") {
    console.error("Error checking subscription status:", lookupError);
    return { error: "Failed to check subscription status. Please try again." };
  }

  if (existingSubscriber) {
    console.log("Email already subscribed:", email);
    return { error: "This email is already subscribed to our newsletter." };
  }

  console.log("Adding email to subscribers table:", email);
  const { error } = await supabase
    .from("subscribers")
    .insert([{ email, subscribed_at: new Date(), status: "active" }]);

  if (error) {
    console.error("Database error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }

  console.log("Subscription successful, now sending welcome email");
  const emailResult = await sendWelcomeEmail(email);

  if (!emailResult.success) {
    console.error("Email sending error:", emailResult.error);
    return {
      success: true,
      warning: "Subscribed successfully, but welcome email couldn't be sent.",
    };
  }

  console.log("Welcome email sent successfully");
  return { success: true };
}
