import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  email: z.email("Please enter a valid email"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number"),

  city: z
    .string()
    .min(2, "City is required"),

  address: z
    .string()
    .min(5, "Please enter your full address"),

  payment: z.enum(
    ["cod", "bkash", "nagad"],
    "Please select a payment method"
  ),
});