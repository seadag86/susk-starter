import { z } from 'zod';

export const registerUserSchema = z.object({
    full_name: z
        .string()
        .max(140, 'Name must be 140 characters or less')
        .nullish(),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(64, 'Password must be 64 characters or less'),
    passwordConfirm: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(64, 'Password must be 64 characters or less')
});

export const profileSchema = registerUserSchema.pick({ full_name: true });
export type ProfileSchema = typeof profileSchema;

export const passwordLoginSchema = registerUserSchema.pick({
    email: true,
    password: true
});
export type PasswordLoginSchema = typeof passwordLoginSchema;

export const otpLoginSchema = registerUserSchema.pick({ email: true });
export type OtpLoginSchema = typeof otpLoginSchema;

export const emailSchema = registerUserSchema.pick({ email: true });
export type EmailSchema = typeof emailSchema;

export const passwordSchema = registerUserSchema.pick({
    password: true,
    passwordConfirm: true
});
export type PasswordSchema = typeof passwordSchema;
