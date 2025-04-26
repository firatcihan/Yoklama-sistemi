export interface AttendanceData {
    totalAttendancesCount: number;
    totalParticipantsCount: number;
    totalAttendanceRate: number;
    allAttendances: LectureAttendance[];
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