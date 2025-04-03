import CreateStudentModal from "@/components/Modals/create/createStudent";
import CreateTeacherModal from "@/components/Modals/create/createTeacher";
import CreateLectureModal from "@/components/Modals/create/createLecture";

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
];

export default Modals;
