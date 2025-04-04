import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";
import useCreateLecture from "@/api/dashboard/lectures/createNewLecture.ts";
import { z } from "zod";
import { createLectureSchema } from "@/schemas/createLectureSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import XSeparator from "@/components/XSeparator";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Check, UserPlus } from "lucide-react";
import React from "react";
import { PulseLoader } from "react-spinners";
import { ModalProps } from "@/components/Modals/allModals.ts";

export default function CreateLectureForm({ close }: ModalProps) {
  const { data: students } = useGetStudents();
  const { data: teachers } = useGetTeachers();
  const { mutate: createLecture, isPending } = useCreateLecture();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const popoverRef2 = React.useRef<HTMLDivElement>(null);

  interface selectedTeacher {
    id: string;
    name: string;
    email: string;
  }
  interface selectedStudent {
    name: string;
    studentNumber: string;
  }
  const [selectedStudents, setSelectedStudents] = React.useState<
    selectedStudent[]
  >([]);
  const [selectedTeacher, setSelectedTeacher] = React.useState<selectedTeacher>(
    { id: "", name: "", email: "" },
  );

  function onSubmit(values: z.infer<typeof createLectureSchema>) {
    createLecture(values);
  }

  const createLectureForm = useForm<z.infer<typeof createLectureSchema>>({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      name: "",
      lectureCode: "",
      instructor: {},
      participants: [],
    },
  });

  return (
    <div className="px-6 py-4">
      <Form {...createLectureForm}>
        <form
          onSubmit={createLectureForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={createLectureForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Ders ismi giriniz.
                </FormLabel>
                <FormControl>
                  <Input placeholder="Programalama Temelleri" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createLectureForm.control}
            name="lectureCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Ders Kodu Giriniz
                </FormLabel>
                <FormControl>
                  <Input placeholder="BIP2024" {...field} />
                </FormControl>
                <FormDescription>
                  3 Harf ve 4 Rakamdan oluşmalıdır.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createLectureForm.control}
            name="instructor"
            render={({ field }) => (
              <FormItem className="!dontClose">
                <FormLabel className="text-[16px] font-semibold">
                  Dersi bir öğretmene atayın.
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Öğretmen seçiniz</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      ref={popoverRef2}
                      className="dontClose w-80 flex flex-col !p-1 max-h-[300px] overflow-auto"
                    >
                      {teachers?.map((teacher) => (
                        <div key={teacher.id}>
                          <div
                            onClick={() => {
                              if (selectedTeacher.id === teacher.id) {
                                setSelectedTeacher({
                                  id: "",
                                  name: "",
                                  email: "",
                                });
                                field.onChange({ id: "", name: "", email: "" });
                              } else {
                                setSelectedTeacher({
                                  id: teacher.id,
                                  name: teacher.name,
                                  email: teacher.email,
                                });
                                field.onChange({
                                  id: teacher.id,
                                  name: teacher.name,
                                  email: teacher.email,
                                });
                              }
                            }}
                            className="hover:bg-[#f7f8f9] p-2 text-[14px] items-center flex"
                          >
                            <div className="w-[15%] flex items-center justify-center">
                              {selectedTeacher.id === teacher.id && <Check />}
                            </div>
                            <div className="flex flex-col space-x-2">
                              <div className="text-sm font-medium">
                                {teacher.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {teacher.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <XSeparator extraClasses="!mt-0" />
                          </div>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Seçtiğiniz öğretmen:{" "}
                  {selectedTeacher.name || "Derse atanamış öğretmen yok."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createLectureForm.control}
            name="participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Derse kayıt edilecek öğrencileri seçiniz.
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Öğrenci seçiniz</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      ref={popoverRef}
                      className="dontClose w-80 flex flex-col !p-1 max-h-[300px] overflow-auto"
                    >
                      {students?.map((student) => (
                        <div>
                          <div
                            onClick={() => {
                              setSelectedStudents((prev) => {
                                const isSelected = prev.some(
                                  (s) =>
                                    s.studentNumber === student.studentNumber,
                                );
                                const updatedStudents = isSelected
                                  ? prev.filter(
                                      (s) =>
                                        s.studentNumber !==
                                        student.studentNumber,
                                    )
                                  : [
                                      ...prev,
                                      {
                                        name: student.name,
                                        studentNumber: student.studentNumber,
                                      },
                                    ];
                                field.onChange(updatedStudents);
                                return updatedStudents;
                              });
                            }}
                            key={student.id}
                            className="hover:bg-[#f7f8f9] p-2 text-[14px] items-center flex"
                          >
                            <div className="w-[15%] flex items-center justify-center">
                              {selectedStudents.some(
                                (s) =>
                                  s.studentNumber === student.studentNumber,
                              ) && <Check size={21} />}
                            </div>
                            <div className="w-[40%] truncate">
                              {student.name}
                            </div>
                            <div className="w-[40%]">
                              {student.studentNumber}
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <XSeparator />
                          </div>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Seçtiğiniz öğrenciler:{" "}
                  {selectedStudents.length > 0
                    ? selectedStudents.map((s) => s.name).join(", ")
                    : "Derse kayıtlı öğrenci yok."}
                </FormDescription>
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
                  <UserPlus size={20} className="mr-2" /> Ders Oluştur
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
