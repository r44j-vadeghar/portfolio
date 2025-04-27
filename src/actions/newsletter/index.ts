"use server";

import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "../resend";

export async function addEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  const { data: existingSubscriber } = await supabase
    .from("subscribers")
    .select("email")
    .eq("email", email)
    .single();

  if (existingSubscriber) {
    return { error: "This email is already subscribed to our newsletter." };
  }

  const { error } = await supabase
    .from("subscribers")
    .insert([{ email, subscribed_at: new Date() }]);

  if (error) {
    console.error("Database error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }

  const emailResult = await sendWelcomeEmail(email);
  if (!emailResult.success) {
    console.error("Email sending error:", emailResult.error);
  }

  return { success: true };
}
