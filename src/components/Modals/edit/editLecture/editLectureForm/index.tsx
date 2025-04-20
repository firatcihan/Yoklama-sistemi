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
import React from "react";
import { PulseLoader } from "react-spinners";
import { ModalProps } from "@/components/Modals/allModals.ts";
import useModalStore from "@/stores/modal";

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
    values.id = modal[0].data;
    console.log(values);
    //editLecture(values);
  }

  const editLectureForm = useForm<z.infer<typeof EditLectureSchema>>({
    resolver: zodResolver(EditLectureSchema),
    defaultValues: {
      name: lectureData?.name,
      lectureCode: lectureData?.lectureCode,
    },
  });

  if (lectureData?.instructor) {
    editLectureForm.setValue("instructor", {
      id: lectureData.instructor.id,
      name: lectureData.instructor.name,
      email: lectureData.instructor.email,
    });
  }

  if (pending2) {
    return (
      <div className="flex items-center justify-center h-full">
        <PulseLoader color="#000000" />
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
          <FormField
            defaultValue={lectureData?.instructor}
            control={editLectureForm.control}
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
                      {teachers?.length
                        ? teachers.map((t) => (
                            <div
                              key={t.id}
                              onClick={() => {
                                // aynı hoca seçilmişse temizle, değilse ata
                                if (field.value?.id === t.id) {
                                  field.onChange(undefined);
                                } else {
                                  field.onChange({
                                    id: t.id,
                                    name: t.name,
                                    email: t.email,
                                  });
                                }
                              }}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <div className="w-6">
                                {field.value?.id === t.id && <Check />}
                              </div>
                              <div className="ml-2">
                                <div className="text-sm font-medium">
                                  {t.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {t.email}
                                </div>
                              </div>
                            </div>
                          ))
                        : "Öğretmen bulunamadı."}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Seçtiğiniz öğretmen:{" "}
                  {field.value?.name ?? "Derse atanmış öğretmen yok."}
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
