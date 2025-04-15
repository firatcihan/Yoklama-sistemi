export interface GetStudentInterface {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  role: string;
  createTime: string;
  lastUpdateTime: string;
  assignedClasses: string[];
}

export interface CreateStudentInterface {
  studentNumber: string;
  name: string;
  email: string;
  password: string;
  assignedClasses: string[];
}

export interface DeleteStudentInterface {
    id: string;
}