
export interface TeacherInterface {
    id: string;
    name: string;
    email: string;
    role: string;
    createTime: string;
    lastUpdateTime: string;
    classes: string[];
}

export interface DeleteTeacherInterface {
    id: string;
}

export interface CreateTeacherInterface {
  name: string;
  email: string;
  password: string;
  classes: string[];
}
