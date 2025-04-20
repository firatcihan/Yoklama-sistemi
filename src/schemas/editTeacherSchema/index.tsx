import { z } from "zod";

export const editTeacherSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(30, "İsim en fazla 50 karakter olabilir."),
});

export type editTeacherFormData = z.infer<typeof editTeacherSchema>;
