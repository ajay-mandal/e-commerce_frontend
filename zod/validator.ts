import z from 'zod';

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SigninType = z.infer<typeof signinInput>;

