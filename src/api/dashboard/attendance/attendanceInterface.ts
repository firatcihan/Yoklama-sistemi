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

interface studentInAttendanceRecord {
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
