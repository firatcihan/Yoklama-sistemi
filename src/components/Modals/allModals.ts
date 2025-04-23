import CreateStudentModal from "@/components/Modals/create/createStudent";
import CreateTeacherModal from "@/components/Modals/create/createTeacher";
import CreateLectureModal from "@/components/Modals/create/createLecture";
import DeleteTeacherModal from "@/components/Modals/delete/deleteTeacher";
import DeleteStudentModal from "@/components/Modals/delete/deleteStudent";
import DeleteLectureModal from "@/components/Modals/delete/deleteLecture";
import EditLectureModal from "@/components/Modals/edit/editLecture";
import EditTeacherModal from "@/components/Modals/edit/editTeacher";
import EditStudentModal from "@/components/Modals/edit/editStudent";
import ViewLecture from "@/components/Modals/view/viewLecture";
import ViewStudent from "@/components/Modals/view/viewStudent";
import ViewTeacher from "@/components/Modals/view/viewTeacher";
import ViewAssignedStudentsSubModal from "@/components/Modals/view/viewLecture/viewAssignedStudents";
import LectureAssignStudentModal from "@/components/Modals/assign/lecture/assignStudent";
import LectureAssignTeacherModal from "@/components/Modals/assign/lecture/assignTeacher";
import StudentAssignLectureModal from "@/components/Modals/assign/student/assignLecture";
import TeacherAssignLectureModal from "@/components/Modals/assign/teacher/assignLecture";
import CreateAttendanceModal from "@/components/Modals/create/createAttendance";

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
    element: EditStudentModal,
  },
  {
    name: "editTeacher",
    element: EditTeacherModal,
  },
  {
    name: "editLecture",
    element: EditLectureModal,
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
  {
    name: "viewStudent",
    element: ViewStudent,
  },
  {
    name: "viewTeacher",
    element: ViewTeacher,
  },
  {
    name: "viewAssignedStudents",
    element: ViewAssignedStudentsSubModal,
  },
  {
    name: "lectureAssignStudent",
    element: LectureAssignStudentModal,
  },
  {
    name: "lectureAssignTeacher",
    element: LectureAssignTeacherModal,
  },
  {
    name: "studentAssignLecture",
    element: StudentAssignLectureModal,
  },
  {
    name: "teacherAssignLecture",
    element: TeacherAssignLectureModal,
  },
  {
    name: "createAttendance",
    element: CreateAttendanceModal,
  },
];

export default Modals;
