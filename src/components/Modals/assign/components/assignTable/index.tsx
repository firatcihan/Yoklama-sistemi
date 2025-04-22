import AssignTableColumn from "@/components/Modals/assign/components/assignTableColumn";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";
import { useState } from "react";
import classNames from "classnames";
import { Input } from "@/components/ui/input.tsx";
import XSeparator from "@/components/XSeparator";

interface selectedLecturesInterface {
  id: string;
  lectureCode: string;
}

interface AssignTableProps {
  selectedLectures: selectedLecturesInterface[];
  onLectureToggle: (lec: selectedLecturesInterface) => void;
}

export default function AssignTable({
  selectedLectures,
  onLectureToggle,
}: AssignTableProps) {
  const { data: allClasses } = useGetAllClasses();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredLectures = allClasses?.filter(
    (lecture) =>
      lecture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.lectureCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lecture.instructor?.name &&
        lecture.instructor.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (lecture.instructor?.email &&
        lecture.instructor.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
  );

  if (allClasses) {
    return (
      <>
        <div className="mb-4">
          <label
            htmlFor="searchLectures"
            className="block text-sm font-medium text-gray-700"
          >
            Search Lectures
          </label>
          <Input
            type="text"
            id="searchLectures"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search by name, code or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-2" />
        <div className="flex flex-col">
          <div
            className={classNames("flex bg-gray-50 sticky top-0 z-10", {
              "mb-3": filteredLectures?.length === 0,
            })}
          >
            <div className="w-[25%]">Code</div>
            <div className="w-[55%]">Name</div>
            <div className="w-[20%] flex items-center justify-center">
              Assign
            </div>
          </div>
          <div className="flex flex-col gap-1 max-h-64 overflow-y-auto mb-6">
            {filteredLectures?.length === 0 ? (
              <div className="flex items-center justify-center text-gray-500">
                No results found
              </div>
            ) : (
              filteredLectures?.map((lecture) => {
                const isAssigned = selectedLectures.some(
                  (sl) => sl.id === lecture.id,
                );
                return (
                  <AssignTableColumn
                    key={lecture.id}
                    lectureId={lecture.id}
                    lectureCode={lecture.lectureCode}
                    lectureName={lecture.name}
                    isAssigned={isAssigned}
                    onClickFunc={onLectureToggle}
                  />
                );
              })
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <ModalLoader />;
  }
}
