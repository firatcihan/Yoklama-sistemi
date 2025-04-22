import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";
import { useState } from "react";
import classNames from "classnames";
import { Input } from "@/components/ui/input.tsx";
import XSeparator from "@/components/XSeparator";
import LectureAssignStudentTableColumn from "@/components/Modals/assign/components/lectureAssignStudentTableColumn";

interface selectedStudentInterface {
  name: string;
  studentNumber: string;
}

interface AssignTableProps {
  selectedStudents: selectedStudentInterface[];
  onStudentToggle: (lec: selectedStudentInterface) => void;
}

export default function LectureAssignStudentTable({
  selectedStudents,
  onStudentToggle,
}: AssignTableProps) {
  const { data: allStudents } = useGetStudents();

  const [searchTerm, setSearchTerm] = useState<string>("");

  if (selectedStudents) {
    const filteredStudents = allStudents?.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentNumber.includes(searchTerm),
    );

    if (allStudents) {
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
                "mb-3": filteredStudents?.length === 0,
              })}
            >
              <div className="w-[35%]">Code</div>
              <div className="w-[45%]">Name</div>
              <div className="w-[20%] flex items-center justify-center">
                Assign
              </div>
            </div>
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto mb-6">
              {filteredStudents?.length === 0 ? (
                <div className="flex items-center justify-center text-gray-500">
                  No results found
                </div>
              ) : (
                filteredStudents?.map((students) => {
                  const isAssigned = selectedStudents.some(
                    (sl) => sl.studentNumber === students.studentNumber,
                  );
                  return (
                    <LectureAssignStudentTableColumn
                      key={students.studentNumber}
                      studentNumber={students.studentNumber}
                      name={students.name}
                      isAssigned={isAssigned}
                      studentOnClickFunc={onStudentToggle || (() => {})}
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
