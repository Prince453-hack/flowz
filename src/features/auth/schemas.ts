import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email(),
  password: z.string().min(1, "Minimum 8 characters").max(256),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.string().trim().min(1, "Enter your email").email(),
  password: z.string().min(8, "Minimum 8 characters").max(256),
});
