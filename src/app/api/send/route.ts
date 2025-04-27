import NewsletterTemplate from "@/components/emails/NewsletterTemplate";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { subject, preheader, content, subscriberIds } = await request.json();
    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email")
      .in("id", subscriberIds)
      .eq("status", "active");

    if (subscribers) {
      const { data, error } = await resend.emails.send({
        from: "Raj Vadeghar <newsletter@r44j.dev>",
        to: subscribers.map((sub) => sub.email),
        subject: subject,
        react: NewsletterTemplate({ preheader, content }),
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch subscribers" },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
