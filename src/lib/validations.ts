import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().min(10, "Please enter your complete address"),
  city: z.string().min(2, "Please enter your city"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional()
    .or(z.literal("")),
  scrapTypes: z
    .array(z.string())
    .min(1, "Select at least one scrap type"),
  estimatedWeight: z.string().optional(),
  pickupDate: z
    .string()
    .min(1, "Pick a date for your pickup")
    .refine((d) => {
      // Parse as a LOCAL date — `new Date("YYYY-MM-DD")` would be UTC midnight
      // and wrongly reject "today" in timezones behind UTC.
      const [y, m, day] = d.split("-").map(Number);
      const date = new Date(y, (m ?? 1) - 1, day ?? 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(date.getTime()) && date >= today;
    }, "Pickup date must be today or later"),
  pickupTime: z.string().min(1, "Pick a time slot"),
  notes: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;
