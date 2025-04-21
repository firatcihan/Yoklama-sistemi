import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";
import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import useEditLecture from "@/api/dashboard/lectures/editLecture.ts";
import { z } from "zod";
import { EditLectureSchema } from "@/schemas/editLectureSchema";
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
import React, { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { ModalProps } from "@/components/Modals/allModals.ts";
import useModalStore from "@/stores/modal";
import XSeparator from "@/components/XSeparator";
import toast from "react-hot-toast";

export default function EditLectureForm({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: teachers } = useGetTeachers();
  const {
    data: lectureData,
    isPending: pending2,
    isSuccess,
  } = useGetLectureById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });
  const { mutate: editLecture, isPending } = useEditLecture();
  const popoverRef2 = React.useRef<HTMLDivElement>(null);

  function onSubmit(values: z.infer<typeof EditLectureSchema>) {
    if (!lectureData) {
      toast.error("Ders bilgileri alınamadı.");
      return;
    }
    values.id = lectureData.id;
    values.instructor = selectedTeacher;
    editLecture(values);
  }

  interface selectedTeacher {
    id: string;
    name: string;
    email: string;
  }

  const [selectedTeacher, setSelectedTeacher] = React.useState<selectedTeacher>(
    { id: "", name: "", email: "" },
  );

  const editLectureForm = useForm<z.infer<typeof EditLectureSchema>>({
    resolver: zodResolver(EditLectureSchema),
    defaultValues: {
      name: lectureData?.name,
      lectureCode: lectureData?.lectureCode,
    },
  });

  useEffect(() => {
    if (isSuccess) setSelectedTeacher(lectureData.instructor);
  }, [isSuccess, lectureData]);

  if (pending2) {
    return (
      <div className="flex items-center justify-center h-full">
        <PulseLoader className="p-10" size={30} color="#1e376d" />
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <Form {...editLectureForm}>
        <form
          onSubmit={editLectureForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            defaultValue={lectureData?.name}
            control={editLectureForm.control}
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
            defaultValue={lectureData?.lectureCode}
            control={editLectureForm.control}
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
          <Popover>
            <div className="!mb-2 font-semibold">Derse öğretmen atayın</div>
            <PopoverTrigger asChild className="!mb-2">
              <Button variant="outline" className="w-full text-[#71717b]">
                Öğretmen seçiniz
              </Button>
            </PopoverTrigger>
            <PopoverContent
              ref={popoverRef2}
              className="dontClose w-80 flex flex-col !p-1 max-h-[300px] overflow-auto"
            >
              {teachers && teachers.length > 0
                ? teachers?.map((teacher) => (
                    <div key={teacher.id}>
                      <div
                        onClick={() => {
                          if (selectedTeacher.id === teacher.id) {
                            setSelectedTeacher({
                              id: "",
                              name: "",
                              email: "",
                            });
                          } else {
                            setSelectedTeacher({
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
                  ))
                : "Öğretmen bulunamadı."}
            </PopoverContent>
            <div className="text-[#71717b] text-[14px] font-normal">
              <div>
                {selectedTeacher.id ? (
                  <div> Derse atanan öğretmen: {selectedTeacher.name}</div>
                ) : (
                  <div>Derse atanmış öğretmen bulunmuyor</div>
                )}
              </div>
            </div>
          </Popover>
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
                  <UserPlus size={20} className="mr-2" /> Dersi güncelle
                </p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
