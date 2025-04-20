export interface TeacherInterface {
  id: string;
  name: string;
  email: string;
  role: string;
  createTime: string;
  lastUpdateTime: string;
  classes: {
    id: string;
    lectureCode: string;
  }[];
}

export interface DeleteTeacherInterface {
  id: string;
}

export interface CreateTeacherInterface {
  name: string;
  email: string;
  password: string;
  classes: {
    id: string;
    lectureCode: string;
  }[];
}
export interface EditTeacherInterface {
  id?: string;
  name?: string;
  email?: string;
}
