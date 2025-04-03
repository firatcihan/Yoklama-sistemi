import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import useCreateTeacher from "@/api/dashboard/teachers/createNewTeacher.ts";
import { z } from "zod";
import { createTeacherSchema } from "@/schemas/createTeacherSchema";
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
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Check, UserPlus } from "lucide-react";
import React from "react";
import { PulseLoader } from "react-spinners";

export default function CreateTeacherForm({ close }: { close: () => void }) {
  const { data: classes } = useGetAllClasses();
  const { mutate: createTeacher, isPending } = useCreateTeacher();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>([]);

  function onSubmit(values: z.infer<typeof createTeacherSchema>) {
    createTeacher(values);
  }

  const createTeacherForm = useForm<z.infer<typeof createTeacherSchema>>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      classes: [],
    },
  });

  return (
    <div className="px-6 py-4">
      <Form {...createTeacherForm}>
        <form
          onSubmit={createTeacherForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={createTeacherForm.control}
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
            control={createTeacherForm.control}
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
          <FormField
            control={createTeacherForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğretmen Şifresi
                </FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createTeacherForm.control}
            name="classes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold">
                  Öğretmene ders ata.
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
                            if (selectedClasses.includes(lecture.id)) {
                              updatedClasses = selectedClasses.filter(
                                (item) => item !== lecture.id,
                              );
                            } else {
                              updatedClasses = [...selectedClasses, lecture.id];
                            }
                            setSelectedClasses(updatedClasses);
                            field.onChange(updatedClasses);
                          }}
                          key={lecture.id}
                          className="hover:bg-[#f7f8f9] p-2 text-[14px] items-center flex"
                        >
                          <span className="mr-3">
                            <Check
                              color={
                                selectedClasses.includes(lecture.id)
                                  ? "black"
                                  : "white"
                              }
                            />
                          </span>
                          <span className="mr-3">{lecture.id}</span>
                          <p className="truncate">{lecture.name}</p>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <div className="flex gap-2">
                  {selectedClasses.length > 0
                    ? selectedClasses.map((lec) => <div key={lec}>{lec}</div>)
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
                  <UserPlus size={20} className="mr-2" /> Öğretmen Oluştur
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
