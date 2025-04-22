import ModalLoader from "@/components/Modals/components/modalLoader";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";
import { useState } from "react";
import classNames from "classnames";
import { Input } from "@/components/ui/input.tsx";
import XSeparator from "@/components/XSeparator";
import LectureAssignTeacherTableColumn from "@/components/Modals/assign/components/lectureAssignTeacherTableColumn";

interface selectedTeacherInterface {
  id: string;
  name: string;
  email: string;
}

interface AssignTableProps {
  selectedTeacher: selectedTeacherInterface;
  onTeacherToggle: (lec: selectedTeacherInterface) => void;
}

export default function LectureAssignTeacherTable({
  selectedTeacher,
  onTeacherToggle,
}: AssignTableProps) {
  const { data: allTeachers } = useGetTeachers();

  const [searchTerm, setSearchTerm] = useState<string>("");

  if (selectedTeacher) {
    const filteredTeachers = allTeachers?.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (allTeachers) {
      return (
        <>
          <div className="mb-4">
            <label
              htmlFor="searchLectures"
              className="block text-sm font-medium text-gray-700"
            >
              Search İnstructors
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
                "mb-3": filteredTeachers?.length === 0,
              })}
            >
              <div className="w-[35%]">email</div>
              <div className="w-[45%]">Name</div>
              <div className="w-[20%] flex items-center justify-center">
                Assign
              </div>
            </div>
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto mb-6">
              {filteredTeachers?.length === 0 ? (
                <div className="flex items-center justify-center text-gray-500">
                  No results found
                </div>
              ) : (
                filteredTeachers?.map((teacher) => {
                  const isAssigned = selectedTeacher.id === teacher.id;
                  return (
                    <LectureAssignTeacherTableColumn
                      key={teacher.id}
                      email={teacher.email}
                      id={teacher.id}
                      teacherOnClickFunc={onTeacherToggle}
                      name={teacher.name}
                      isAssigned={isAssigned}
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
}
