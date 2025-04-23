import SelectLecture from "@/components/Modals/create/createAttendance/createAttendanceForm/selectLecture";
import SelectDistance from "@/components/Modals/create/createAttendance/createAttendanceForm/selectDistance";
import SelectExpiration from "@/components/Modals/create/createAttendance/createAttendanceForm/selectExpiration";
import useCreateAttendance from "@/api/dashboard/attendance/createAttendance.ts";
import { Button } from "@/components/ui/button.tsx";
import { ClipboardPlus } from "lucide-react";
import { PulseLoader } from "react-spinners";
import useAuthStore from "@/stores/auth";
import React from "react";
import { RawLecture } from "@/api/dashboard/lectures/lectureInterface.ts";
import toast from "react-hot-toast";

type SelectedLectureType = RawLecture | null;

export default function CreateAttendanceForm({ close }: { close: () => void }) {
  const { user } = useAuthStore();
  const [selectedLecture, setSelectedLecture] =
    React.useState<SelectedLectureType>(null);
  const [distanceRange, setDistanceRange] = React.useState<number>(0);
  const [expirationTime, setExpirationTime] = React.useState<number>(0);
  const { mutate: createAttendance, isPending } = useCreateAttendance();

  if (!user) return;

  const handleCreateAttendance = async () => {
    if (user.role !== "teacher") return;
    if (user.classes?.some((lecture) => lecture.id === "asd")) return;
    if (distanceRange === 0 || expirationTime === 0 || !selectedLecture) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }
    const attendanceData = {
      lectureId: selectedLecture?.id || "", // Replace with actual selected lecture ID
      createdBy: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      distanceRange: distanceRange, // Replace with actual distance range
      expirationTime: expirationTime, // Replace with actual expiration time
    };
    console.log(attendanceData);
    createAttendance(attendanceData);
  };

  return (
    <div className="flex flex-col px-5 gap-4 mb-3">
      <SelectLecture
        func={(value: RawLecture | undefined) =>
          setSelectedLecture(value || null)
        }
      />
      <SelectDistance func={setDistanceRange} />
      <SelectExpiration func={setExpirationTime} />
      <div className="flex justify-end items-center shrink-0 gap-2 mt-2">
        <Button
          onClick={close}
          variant={"outline"}
          className="!bg-red-500 hover:!bg-red-400 !text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateAttendance}
          variant={"destructive"}
          className="bg-primary hover:!bg-[#2e4d8f] !transition-colors !px-2"
        >
          {isPending ? (
            <PulseLoader color="#ffffff" className="px-10.5" />
          ) : (
            <p className="flex items-center justify-center">
              <ClipboardPlus className="mr-2" /> Yoklama Oluştur
            </p>
          )}
        </Button>
      </div>
    </div>
  );
}
