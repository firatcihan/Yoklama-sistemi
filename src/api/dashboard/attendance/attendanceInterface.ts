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
