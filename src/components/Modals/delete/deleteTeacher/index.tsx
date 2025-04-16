import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Trash2 } from "lucide-react";
import useGetTeacherById from "@/api/dashboard/teachers/GetTeacherById.ts";
import useModalStore from "@/stores/modal";
import { Input } from "@/components/ui/input.tsx";
import { BeatLoader, PulseLoader } from "react-spinners";
import useDeleteTeacher from "@/api/dashboard/teachers/deleteTeacher.ts";

export default function DeleteTeacherModal({ close }: { close: () => void }) {
  const [teacherName, setTeacherName] = React.useState<string>("");
  const { modal } = useModalStore();
  const { mutate: deleteTeacher, isPending: pendingDeleteTeacher } =
    useDeleteTeacher();
  const {
    data: teacherToDelete,
    isPending,
    isSuccess,
  } = useGetTeacherById({
    id: !modal[0] ? "" : modal[0].data ? modal[0].data : "",
  });

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
            {teacherToDelete?.name} silinsin mi?
          </div>
          <hr className="mb-4" />
          <div className="text-[15px] mb-6">
            Bu işlem Öğretmeni kalıcı olarak silecektir.
            <br />
            <span className="font-semibold">
              Silinen Öğretmen geri alınamaz.
            </span>
          </div>
          {teacherToDelete.classes.length > 0 && (
            <div className="text-red-500 mb-4">
              Bu öğretmene atanmış dersler var. <br />
              Öğretmen Derslerden silinecektir.
              <div className="flex items-center">
                {teacherToDelete.classes.map((item) => (
                  <div key={item.id} className="text-[15px] mr-2 tex-red-500">
                    {item.lectureCode}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mb-5 w-[70%] h-[70%]">
            <p>Öğretmenin ismini giriniz:</p>
            <Input
              value={teacherName}
              onChange={(e) => {
                setTeacherName(e.target.value);
              }}
              placeholder={teacherToDelete?.name}
            />
          </div>
          <div className="flex item-center justify-end">
            <Button onClick={() => close()} variant="outline">
              Vazgeç
            </Button>
            <Button
              onClick={() => {
                if (teacherName === teacherToDelete?.name) {
                  deleteTeacher({
                    id: teacherToDelete?.id,
                  });
                }
              }}
              disabled={teacherName !== teacherToDelete?.name}
              variant="outline"
              className="ml-3 !bg-[#f93a37] text-white"
            >
              {pendingDeleteTeacher ? (
                <BeatLoader color="white" />
              ) : (
                <>
                  <Trash2 /> Öğretmeni Sil
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
