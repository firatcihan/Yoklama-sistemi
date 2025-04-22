export interface RawLecture {
  id: string;
  name: string;
  lectureCode: string;
  participants: {
    studentNumber: string;
    name: string;
  }[];
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  participantsCount: string;
  createTime: string;
  lastUpdateTime: string;
}

export interface DeleteLectureInterface {
  id: string;
}

export interface CreateLectureInterface {
  name: string;
  lectureCode: string;
  participants?: {
    studentNumber: string;
    name: string;
  }[];
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface EditLectureInterface {
  id?: string;
  name: string;
  lectureCode: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AssignStudentsToLectureInterface {
  lectureId: string;
  students: {
    studentNumber: string;
    name: string;
  }[];
}

export interface AssignTeacherToLectureInterface {
  lectureId: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
}
