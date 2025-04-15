import CreateStudentModal from "@/components/Modals/create/createStudent";
import CreateTeacherModal from "@/components/Modals/create/createTeacher";
import CreateLectureModal from "@/components/Modals/create/createLecture";
import ViewLecture from "@/components/Modals/viewLecture";
import DeleteTeacherModal from "@/components/Modals/delete/deleteTeacher";
import DeleteStudentModal from "@/components/Modals/delete/deleteStudent";
import DeleteLectureModal from "@/components/Modals/delete/deleteLecture";

export interface ModalProps {
  close: () => void;
  dontCloseRef?: React.RefObject<null | HTMLDivElement>;
}

const Modals = [
  {
    name: "createStudent",
    element: CreateStudentModal,
  },
  {
    name: "createTeacher",
    element: CreateTeacherModal,
  },
  {
    name: "createLecture",
    element: CreateLectureModal,
  },
  {
    name: "deleteTeacher",
    element: DeleteTeacherModal,
  },
  {
    name: "deleteStudent",
    element: DeleteStudentModal,
  },
  {
    name: "deleteLecture",
    element: DeleteLectureModal,
  },
  {
    name: "viewLecture",
    element: ViewLecture,
  },
];

export default Modals;
