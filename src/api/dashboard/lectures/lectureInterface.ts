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
  id: string;
  name: string;
  lectureCode: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
}
