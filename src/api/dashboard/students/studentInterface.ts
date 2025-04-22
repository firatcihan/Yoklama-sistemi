export interface GetStudentInterface {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  role: string;
  createTime: string;
  lastUpdateTime: string;
  assignedClasses?: {
    id: string;
    lectureCode: string;
  }[];
}

export interface CreateStudentInterface {
  studentNumber: string;
  name: string;
  email: string;
  password: string;
  assignedClasses?: {
    id: string;
    lectureCode: string;
  }[];
}

export interface DeleteStudentInterface {
  id: string;
}

export interface EditStudentInterface {
  id?: string;
  studentNumber?: string;
  name?: string;
  email?: string;
}

export interface ChangeStudentLecturesInterface {
  studentId: string;
  lectures: {
    id: string;
    lectureCode: string;
  }[],
}
