"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { sendContactMessage } from "@/app/actions/contact";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    const result = await sendContactMessage(data);
    if (result.success) {
      setSent(true);
      reset();
    } else {
      setServerError(result.error);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Send Us a Message
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="mt-10 p-6 sm:p-8">
            {sent ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto size-12 text-brand-green" />
                <p className="mt-4 font-semibold">Message sent!</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out — we&apos;ll get back to you soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Enter your name"
                      className="mt-2"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="mt-2"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Write your message here..."
                    className="mt-2 min-h-32"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {serverError}
                  </p>
                )}

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Submit <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
