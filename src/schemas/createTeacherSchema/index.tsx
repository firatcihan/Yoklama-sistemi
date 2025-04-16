import { z } from "zod";

export const createTeacherSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .nonempty("E-posta alanı boş bırakılamaz."),
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(30, "İsim en fazla 50 karakter olabilir.")
    .nonempty("İsim alanı boş bırakılamaz."),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .max(50, "Şifre en fazla 50 karakter olabilir.")
    .nonempty("Şifre alanı boş bırakılamaz."),
  classes: z.array(z.object({ lectureCode: z.string(), id: z.string() })),
});

export type createTeacherFormData = z.infer<typeof createTeacherSchema>;
