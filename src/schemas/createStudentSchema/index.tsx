import { z } from "zod";

export const createStudentSchema = z.object({
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
  studentNumber: z
    .string()
    .length(7, "Öğrenci numarası 7 karakter olmalıdır.")
    .regex(/^\d+$/, "Öğrenci numarası sadece rakamlardan oluşmalıdır.")
    .nonempty("Öğrenci Numarası alanı boş bırakılamaz."),
  assignedClasses: z.array(
    z.object({ lectureCode: z.string(), id: z.string() })
  ),
});

export type createStudentFormData = z.infer<typeof createStudentSchema>;
