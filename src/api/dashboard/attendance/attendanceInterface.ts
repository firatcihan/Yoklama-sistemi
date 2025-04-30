interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface CreateAttendance {
  lectureId: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  distanceRange: number;
  expirationTime: number;
}

export interface studentInAttendanceRecord {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
}

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface GetLast2lectureAttendanceResponse {
  lecture: {
    attendanceId: string;
    lectureId: string;
    lectureName: string;
    lectureCode: string;
    createdBy: {
      id: string;
      name: string;
      email: string;
    };
    createdAt: FirestoreTimestamp;
    distanceRange: number;
    expiresAt: FirestoreTimestamp;
    attendanceRecords: AttendanceRecord[];
  };
  participantsCount: number;
  assignedCount: number;
  participateRate: number;
}

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface AttendanceRecord {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
  attendanceTime: FirestoreTimestamp;
}

export interface AttendanceInterface {
  attendanceId: string;
  attendanceRecords: studentInAttendanceRecord[];
  createdAt: FirestoreTimestamp;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  expiresAt: FirestoreTimestamp;
  lectureCode: string;
  lectureId: string;
  lectureName: string;
}

export interface userAttendanceRecordsInterface {
  numberOfLessons: number;
  numberOfAttendances: number;
}

export interface useJoinAttendanceInterface {
  lectureCode: string;
  sessionId: string;
}

interface groupByReturnLectureInterface {
  attendanceId: string;
  lectureCode: string;
  expiresAt: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
}

export interface groupByWeekReturnInterface {
  week: string;
  happendLectures: groupByReturnLectureInterface[];
}
