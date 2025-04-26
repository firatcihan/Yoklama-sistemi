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
