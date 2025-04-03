import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import useCreateLecture from "@/api/dashboard/lectures/createNewLecture.ts";
import { z } from "zod";
import { createLectureSchema } from "@/schemas/createLectureSchema";
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
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Check, UserPlus } from "lucide-react";
import React from "react";
import { PulseLoader } from "react-spinners";

export default function CreateLectureForm({ close }: { close: () => void }) {
  const { data: students } = useGetStudents();
  const { mutate: createLecture, isPending } = useCreateLecture();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);

  function onSubmit(values: z.infer<typeof createLectureSchema>) {
    createLecture(values);
  }

  const createLectureForm = useForm<z.infer<typeof createLectureSchema>>({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      name: "",
      lectureCode: "",
      instructor: "",
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
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Dersi bir öğretmene atayın.
                </FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} />
                </FormControl>
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
                      className="dontClose w-80 flex flex-col !p-1"
                    >
                      {students?.map((student) => (
                        <div
                          onClick={() => {
                            let updatedClasses;
                            if (selectedStudents.includes(student.name)) {
                              updatedClasses = selectedStudents.filter(
                                (item) => item !== student.name,
                              );
                            } else {
                              updatedClasses = [...selectedStudents, student.name];
                            }
                            setSelectedStudents(updatedClasses);
                            field.onChange(updatedClasses);
                          }}
                          key={student.id}
                          className="hover:bg-[#f7f8f9] p-2 text-[14px] items-center flex"
                        >
                          <span className="mr-3">
                            <Check
                              color={
                                selectedStudents.includes(student.name)
                                  ? "black"
                                  : "white"
                              }
                            />
                          </span>
                          <p className="truncate">{student.name}</p>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <div className="flex gap-2">
                  {selectedStudents.length > 0
                    ? selectedStudents.map((lec) => <div key={lec}>{lec}</div>)
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
