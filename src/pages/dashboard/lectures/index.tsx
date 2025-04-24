import { Lecture, lectureColumns } from "@/components/Table/LectureColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import SubmitButton from "@/components/submitButton";
import { ClipboardPlus } from "lucide-react";
import useModalStore from "@/stores/modal";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";

export default function ManageLectures() {
  const { setModal } = useModalStore();
  const { data, isLoading, isError } = useGetAllClasses();
  const lectures: Lecture[] =
    data && data.length > 0
      ? data?.map((lecture) => ({
          id: lecture.id,
          name: lecture.name,
          instructor: lecture.instructor,
          participants: lecture.participants,
          lectureCode: lecture.lectureCode,
          participantsCount: lecture.participants.length.toString(),
        }))
      : [];

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-3 rounded-xl bg-[#f7f8f9]">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-xl sm:text-2xl font-semibold w-[50%]">
            Lectures Information
          </p>
          <div className="flex justify-center items-center">
            <SubmitButton
              text="Create Lecture"
              bgColor="#1e376d"
              onHoverColor="#2e4d8f"
              textIconPosition="left"
              textIcon={<ClipboardPlus className="w-5 h-5" />}
              onClick={() =>
                setModal({ name: "createLecture", data: "lecture" })
              }
            />
          </div>
        </div>
        <DataTable variant="lecture" columns={lectureColumns} data={lectures} />
      </div>
    </>
  );
}
