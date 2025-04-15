import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Trash2 } from "lucide-react";
import useDeleteLecture from "@/api/dashboard/lectures/deleteLecture.ts";
import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import useModalStore from "@/stores/modal";
import { Input } from "@/components/ui/input.tsx";
import { BeatLoader, PulseLoader } from "react-spinners";

export default function DeleteLectureModal({ close }: { close: () => void }) {
  const [lectureCode, setlectureCode] = React.useState<string>("");
  const { modal } = useModalStore();
  const { mutate: deleteLecture, isPending: pendingDeleteLecture } =
    useDeleteLecture();

  const {
    data: lectureToDelete,
    isPending,
    isSuccess,
  } = useGetLectureById({ id: !modal[0] ? "" : modal[0].data ? modal[0].data : "" });

  console.log(lectureToDelete);
  return (
    <div className="w-[350px] sm:w-[450px] bg-white rounded-lg shadow-lg p-4 flex flex-col">
      {isPending && (
        <div className="h-[200px] flex items-center justify-center">
          <PulseLoader color="#1e376d" size={24} />
        </div>
      )}
      {isSuccess && (
        <>
          <div className="font-semibold text-[20px] mb-4">
            {lectureToDelete?.lectureCode} silinsin mi?
          </div>
          <hr className="mb-4" />
          <div className="text-[15px] mb-6">
            Bu işlem dersi kalıcı olarak silecektir.
            <br />
            <span className="font-semibold">Silinen ders geri alınamaz.</span>
          </div>
          {lectureToDelete.participants.length > 0 &&
            lectureToDelete.instructor.id && (
              <div className="text-red-500 mb-4">
                Bu derse kayıtlı öğrenciler ve öğretmen var. <br />
                Öğrenciler ve öğretmen Dersten silinecektir.
              </div>
            )}
          {lectureToDelete.participants.length > 0 &&
            !lectureToDelete.instructor.id && (
              <div className="text-red-500 mb-4">
                Bu derse kayıtlı öğrenciler var. <br />
                Öğrenciler Dersten silinecektir.
              </div>
            )}
          {lectureToDelete.participants.length === 0 &&
            lectureToDelete.instructor.id && (
              <div className="text-red-500 mb-4">
                Bu derse atanmış öğretmen var. <br />
                Öğretmen Dersten silinecektir.
                <div className="text-[15px] mr-2 tex-red-500">
                  {lectureToDelete.instructor.name}
                </div>
              </div>
            )}

          <div className="mb-5 w-[70%] h-[70%]">
            <p>Dersin kodunu giriniz:</p>
            <Input
              value={lectureCode}
              onChange={(e) => {
                setlectureCode(e.target.value);
              }}
              placeholder={lectureToDelete?.lectureCode}
            />
          </div>
          <div className="flex item-center justify-end">
            <Button onClick={() => close()} variant="outline">
              Vazgeç
            </Button>
            <Button
              onClick={() => {
                if (lectureCode === lectureToDelete?.lectureCode) {
                  deleteLecture({
                    id: lectureToDelete?.id,
                  });
                }
              }}
              disabled={lectureCode !== lectureToDelete?.lectureCode}
              variant="outline"
              className="ml-3 !bg-[#f93a37] text-white"
            >
              {pendingDeleteLecture ? (
                <BeatLoader color="white" />
              ) : (
                <>
                  <Trash2 /> Dersi Sil
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
