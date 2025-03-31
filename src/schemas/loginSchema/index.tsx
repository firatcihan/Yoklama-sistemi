import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    password: z.string()
        .min(6, "Şifre en az 6 karakter olmalıdır.")
        .max(50, "Şifre en fazla 50 karakter olabilir."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
