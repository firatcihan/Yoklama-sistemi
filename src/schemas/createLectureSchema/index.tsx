import { z } from "zod";

export const createLectureSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(30, "İsim en fazla 50 karakter olabilir.")
    .nonempty("İsim alanı boş bırakılamaz."),
  lectureCode: z
    .string()
    .min(3, "Ders Kodu en az 3 karakter olmalıdır.")
    .max(30, "Ders Kodu en fazla 50 karakter olabilir.")
    .nonempty("Ders kodu alanı boş bırakılamaz."),
  participants: z.array(z.string()).optional(),
  instructor: z.string().optional(),
});

export type createLectureFormData = z.infer<typeof createLectureSchema>;
