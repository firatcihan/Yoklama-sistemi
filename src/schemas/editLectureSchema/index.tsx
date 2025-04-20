import { z } from "zod";

export const EditLectureSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(30, "İsim en fazla 50 karakter olabilir.")
    .nonempty("İsim alanı boş bırakılamaz."),
  lectureCode: z
    .string()
    .regex(
      /^[A-Za-z]{3}\d{4}$/,
      "Ders Kodu ilk 3 karakter harf ve son 4 karakter rakam olmalıdır.",
    )
    .nonempty("Ders kodu alanı boş bırakılamaz."),
  instructor: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    })
    .optional(),
});

export type editLectureFormData = z.infer<typeof EditLectureSchema>;
