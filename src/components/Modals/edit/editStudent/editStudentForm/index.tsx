import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetStudentById from "@/api/dashboard/students/getStudentById.ts";
import useEditStudent from "@/api/dashboard/students/editStudent.ts";
import { z } from "zod";
import { editStudentSchema } from "@/schemas/editStudentSchema";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { UserPlus } from "lucide-react";
import { PulseLoader } from "react-spinners";
import useModalStore from "@/stores/modal";

export default function EditStudentForm({ close }: { close: () => void }) {
  const { mutate: editStudent, isPending } = useEditStudent();
  const { modal } = useModalStore();
  const { data: studentData, isPending: pending2 } = useGetStudentById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  function onSubmit(values: z.infer<typeof editStudentSchema>) {
    values.id = modal[0].data;
    console.log(values);
    editStudent(values);
  }

  const editStudentForm = useForm<z.infer<typeof editStudentSchema>>({
    resolver: zodResolver(editStudentSchema),
    defaultValues: {
      email: studentData?.email,
      name: studentData?.name,
      studentNumber: studentData?.studentNumber?.slice(-7),
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
      <Form {...editStudentForm}>
        <form
          onSubmit={editStudentForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            defaultValue={studentData?.email}
            control={editStudentForm.control}
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
            control={editStudentForm.control}
            defaultValue={studentData?.name}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğrenci adı
                </FormLabel>
                <FormControl>
                  <Input placeholder="Teacher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editStudentForm.control}
            defaultValue={studentData?.studentNumber?.slice(-7)}
            name="studentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğrenci numarası
                </FormLabel>
                <FormDescription>
                  Girilen öğrenci numarasının başında 2023 olacaktır.
                </FormDescription>
                <FormControl>
                  <Input placeholder="2023..." {...field} />
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
                  <UserPlus size={20} className="mr-2" /> Öğrenciyi güncelle
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
