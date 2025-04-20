import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetTeacherById from "@/api/dashboard/teachers/GetTeacherById.ts";
import useEditTeacher from "@/api/dashboard/teachers/editTeacher.ts";
import { z } from "zod";
import { editTeacherSchema } from "@/schemas/editTeacherSchema";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { UserPlus } from "lucide-react";
import { PulseLoader } from "react-spinners";
import useModalStore from "@/stores/modal";

export default function EditTeacherForm({ close }: { close: () => void }) {
  const { mutate: editTeacher, isPending } = useEditTeacher();
  const { modal } = useModalStore();
  const { data: teacherData, isPending: pending2 } = useGetTeacherById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  function onSubmit(values: z.infer<typeof editTeacherSchema>) {
    values.id = modal[0].data;
    console.log(values);
    editTeacher(values);
  }

  const editTeacherForm = useForm<z.infer<typeof editTeacherSchema>>({
    resolver: zodResolver(editTeacherSchema),
    defaultValues: {
      email: teacherData?.email,
      name: teacherData?.name,
    },
  });

  if (pending2) {
    return (
      <div className="flex items-center justify-center h-full">
        <PulseLoader color="#000000" />
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <Form {...editTeacherForm}>
        <form
          onSubmit={editTeacherForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            defaultValue={teacherData?.email}
            control={editTeacherForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  E-Posta
                </FormLabel>
                <FormControl>
                  <Input placeholder="teacher@hotmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editTeacherForm.control}
            defaultValue={teacherData?.name}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğretmen adı
                </FormLabel>
                <FormControl>
                  <Input placeholder="Teacher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end ">
            <Button
              variant="destructive"
              className="!bg-[#dc2625]"
              type="button"
              onClick={close}
            >
              Vazgeç
            </Button>
            <Button
              variant="destructive"
              className="bg-primary ml-3"
              type="submit"
            >
              {isPending ? (
                <PulseLoader color="#ffffff" />
              ) : (
                <p className="flex items-center justify-center">
                  <UserPlus size={20} className="mr-2" /> Öğretmeni güncelle
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
