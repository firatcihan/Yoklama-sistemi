import CreateStudentModal from "@/components/Modals/create/createStudent";
import CreateTeacherModal from "@/components/Modals/create/createTeacher";
import CreateLectureModal from "@/components/Modals/create/createLecture";
import ViewLecture from "@/components/Modals/viewLecture";

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
    name: "editStudent",
    element: CreateStudentModal,
  },
  {
    name: "editTeacher",
    element: CreateTeacherModal,
  },
  {
    name: "editLecture",
    element: CreateLectureModal,
  },
  {
    name: "viewLecture",
    element: ViewLecture,
  },
];

export default Modals;
