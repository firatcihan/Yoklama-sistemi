import { useParams } from "react-router-dom";

export default function JoinAttendance() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();

  return (
    <div>
      {lectureCode} Dersi yoklama QR Kodu
      {sessionId}
    </div>
  );
}
