"use client";
import { addEmail } from "@/actions/newsletter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="flex-grow"
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Subscribing..." : "Subscribe"}
      </Button>
    </div>
  );
}

export default function Newsletter() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  async function handleSubmit(formData: FormData) {
    try {
      const result = await addEmail(formData);

      if (result?.error) {
        setStatus({
          type: "error",
          message: result.error,
        });
      } else {
        setStatus({
          type: "success",
          message: "You've successfully subscribed to our newsletter!",
        });
        const form = document.getElementById(
          "newsletter-form"
        ) as HTMLFormElement;
        form?.reset();
      }
    } catch (e) {
      console.error("e >>> ", e);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl p-6 bg-card border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-4">
          Get the latest updates and insights directly to your inbox.
        </p>

        {status.type && (
          <Alert
            variant={status.type === "success" ? "default" : "destructive"}
            className="mb-4"
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {status.type === "success" ? "Success!" : "Error"}
            </AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}

        <form
          id="newsletter-form"
          action={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <FormContent />
        </form>
      </div>
    </section>
  );
}
