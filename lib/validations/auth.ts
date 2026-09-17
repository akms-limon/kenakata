import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z.email("Please enter a valid email"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),
});