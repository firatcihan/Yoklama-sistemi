export interface AttendanceData {
  totalAttendancesCount: number;
  totalParticipantsCount: number;
  totalAttendanceRate: number;
  allAttendances: {
    lectureCode: string;
    lectureId: string;
    totalParticipantsCount: number;
    totalAttendancesCount: number;
    sessionsThisWeek?: {
      attendanceId: string;
      attendanceCount: number;
    }[];
    sessionsLastWeek?: {
      attendanceId: string;
      attendanceCount: number;
    }[];
  }[];
}

export interface LectureAttendance {
  lectureCode: string;
  lectureId: string;
  totalParticipantsCount: number;
  totalAttendancesCount: number;
  sessionsThisWeek?: SessionAttendance[];
  sessionsLastWeek?: SessionAttendance[];
}

export interface SessionAttendance {
  attendanceId: string;
  attendanceCount: number;
}
