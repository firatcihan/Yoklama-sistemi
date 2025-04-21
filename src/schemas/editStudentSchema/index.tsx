import { z } from "zod";

export const editStudentSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(30, "İsim en fazla 50 karakter olabilir."),
  studentNumber: z
    .string()
    .length(7, "Öğrenci numarası 7 karakter olmalıdır.")
    .regex(/^\d+$/, "Öğrenci numarası sadece rakamlardan oluşmalıdır.")
    .optional(),
});

export type editStudentFormData = z.infer<typeof editStudentSchema>;
