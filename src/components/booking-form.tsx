"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { createBooking } from "@/app/actions/booking";
import { SCRAP_TYPE_OPTIONS, TIME_SLOTS } from "@/lib/data";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState<{ whatsappUrl: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { scrapTypes: [] },
  });

  const selectedTypes = watch("scrapTypes");

  function toggleScrapType(type: string) {
    const current = selectedTypes ?? [];
    setValue(
      "scrapTypes",
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type],
      { shouldValidate: true }
    );
  }

  async function onSubmit(data: BookingInput) {
    setServerError(null);
    const result = await createBooking(data);
    if (result.success) {
      setSubmitted({ whatsappUrl: result.whatsappUrl });
    } else {
      setServerError(result.error);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-10 text-center">
          <CheckCircle2 className="mx-auto size-16 text-brand-green" />
          <h2 className="mt-6 text-2xl font-bold">Pickup Booked! 🎉</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Your request has been received. Confirm it on WhatsApp so our team
            can assign a verified collector — we&apos;ll confirm within 30
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <a
                href={submitted.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Confirm on WhatsApp
              </a>
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(null)}>
              Book another pickup
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Local date, not UTC — toISOString() would be off by a day in IST at night.
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <Card className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Book a Pickup
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Fill in the details and we&apos;ll take care of the rest.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">
              <User className="size-3.5 text-muted-foreground" /> Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="mt-2"
              {...register("name")}
            />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="phone">
              <Phone className="size-3.5 text-muted-foreground" /> Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="Enter your phone number"
              className="mt-2"
              {...register("phone")}
            />
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="address">
            <MapPin className="size-3.5 text-muted-foreground" /> Pickup Address
          </Label>
          <Input
            id="address"
            placeholder="Enter your complete address"
            className="mt-2"
            {...register("address")}
          />
          <FieldError message={errors.address?.message} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="city">
              <MapPin className="size-3.5 text-muted-foreground" /> City
            </Label>
            <Input
              id="city"
              placeholder="Enter your city"
              className="mt-2"
              {...register("city")}
            />
            <FieldError message={errors.city?.message} />
          </div>
          <div>
            <Label htmlFor="pincode">
              <MapPin className="size-3.5 text-muted-foreground" /> Pincode
              <span className="font-normal text-muted-foreground">
                (Optional)
              </span>
            </Label>
            <Input
              id="pincode"
              inputMode="numeric"
              placeholder="6-digit pincode"
              className="mt-2"
              {...register("pincode")}
            />
            <FieldError message={errors.pincode?.message} />
          </div>
        </div>

        <div>
          <Label>Select Scrap Type</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SCRAP_TYPE_OPTIONS.map((type) => {
              const active = selectedTypes?.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleScrapType(type)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200",
                    active
                      ? "border-brand-green bg-brand-green/15 text-brand-green"
                      : "border-border bg-input text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.scrapTypes?.message} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="estimatedWeight">
              <Scale className="size-3.5 text-muted-foreground" /> Approx Weight
              <span className="font-normal text-muted-foreground">
                (Optional)
              </span>
            </Label>
            <Input
              id="estimatedWeight"
              placeholder="e.g., 10 kg, 2 bags, etc."
              className="mt-2"
              {...register("estimatedWeight")}
            />
          </div>
          <div>
            <Label htmlFor="pickupDate">
              <Calendar className="size-3.5 text-muted-foreground" /> Pickup
              Date
            </Label>
            <Input
              id="pickupDate"
              type="date"
              min={minDate}
              className="mt-2"
              {...register("pickupDate")}
            />
            <FieldError message={errors.pickupDate?.message} />
          </div>
        </div>

        <div>
          <Label>
            <Clock className="size-3.5 text-muted-foreground" /> Pickup Time
          </Label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((slot) => {
              const active = watch("pickupTime") === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setValue("pickupTime", slot, { shouldValidate: true })
                  }
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-xs font-medium transition-all duration-200",
                    active
                      ? "border-brand-green bg-brand-green/15 text-brand-green"
                      : "border-border bg-input text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.pickupTime?.message} />
        </div>

        <div>
          <Label htmlFor="notes">
            Additional Notes
            <span className="font-normal text-muted-foreground">(Optional)</span>
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional information..."
            className="mt-2"
            {...register("notes")}
          />
        </div>

        {serverError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Booking...
            </>
          ) : (
            <>
              Book Pickup <ArrowRight className="size-4" />
            </>
          )}
        </Button>

        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-brand-green" />
          Your information is safe with us. We never share your details.
        </p>
      </form>
    </Card>
  );
}
