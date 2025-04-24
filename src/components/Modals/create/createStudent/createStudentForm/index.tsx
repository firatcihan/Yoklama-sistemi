import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import useCreateStudent from "@/api/dashboard/students/createNewStudent.ts";
import { z } from "zod";
import { createStudentSchema } from "@/schemas/createStudentSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Check, UserPlus } from "lucide-react";
import React from "react";
import { PulseLoader } from "react-spinners";

export default function CreateStudentForm({ close }: { close: () => void }) {
  const { data: classes } = useGetAllClasses();
  const { mutate: createStudent, isPending } = useCreateStudent();
  const popoverRef = React.useRef<HTMLDivElement>(null);

  interface selectedClassInterface {
    lectureCode: string;
    id: string;
  }
  const [selectedClasses, setSelectedClasses] = React.useState<
    selectedClassInterface[]
  >([]);

  function onSubmit(values: z.infer<typeof createStudentSchema>) {
    createStudent(values);
  }

  const createStudentForm = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      studentNumber: "",
      assignedClasses: [],
    },
  });

  return (
    <div className="px-6 py-4">
      <Form {...createStudentForm}>
        <form
          onSubmit={createStudentForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={createStudentForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  E-Posta
                </FormLabel>
                <FormControl>
                  <Input placeholder="student@hotmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createStudentForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğrenci adı
                </FormLabel>
                <FormControl>
                  <Input placeholder="Student" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createStudentForm.control}
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
          <FormField
            control={createStudentForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğrenci Şifresi
                </FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createStudentForm.control}
            name="assignedClasses"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Derse Kayıt Et
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Ders seçiniz</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      ref={popoverRef}
                      className="dontClose w-80 flex flex-col !p-1"
                    >
                      {classes?.map((lecture) => (
                        <div
                          onClick={() => {
                            let updatedClasses;
                            if (
                              selectedClasses.some(
                                (lec) =>
                                  lec.lectureCode === lecture.lectureCode,
                              )
                            ) {
                              updatedClasses = selectedClasses.filter(
                                (item) =>
                                  item.lectureCode !== lecture.lectureCode,
                              );
                            } else {
                              updatedClasses = [
                                ...selectedClasses,
                                {
                                  lectureCode: lecture.lectureCode,
                                  id: lecture.id,
                                },
                              ];
                            }
                            setSelectedClasses(updatedClasses);
                            field.onChange(updatedClasses);
                          }}
                          key={lecture.id}
                          className="hover:bg-[#f7f8f9] p-2 text-[14px] items-center flex"
                        >
                          <div className="w-[15%] flex items-center justify-center">
                            {selectedClasses.some(
                              (lec) => lec.lectureCode === lecture.lectureCode,
                            ) && <Check size={21} />}
                          </div>
                          <div className="w-[60%] truncate">{lecture.name}</div>
                          <div className="w-[15%] ml-2">
                            {lecture.lectureCode}
                          </div>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <div className="flex gap-2 shrink-0 flex-wrap mt-1">
                  {selectedClasses.length > 0
                    ? selectedClasses.map((lec) => (
                        <div className="leading-2.5" key={lec.id}>{lec.lectureCode}</div>
                      ))
                    : ""}
                </div>
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
                  <UserPlus size={20} className="mr-2" /> Öğrenci Oluştur
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
