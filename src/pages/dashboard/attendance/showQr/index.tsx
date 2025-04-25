import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function ShowQr() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();

  const sessionUrl = `${import.meta.env.VITE_FRONTEND_URL}/attendance/${lectureCode}/${sessionId}`;

  return (
    <div className="flex flex-col items-center min-h-screen mt-4">
      <h1 className="!text-2xl font-semibold">
        {lectureCode} Dersi yoklama QR Kodu
      </h1>
      <div className="p-4 bg-white rounded-lg shadow mt-3">
        <QRCode value={sessionUrl} size={550} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Bu kodu okutup katılımcılar yönlendirilecektir.
      </p>
    </div>
  );
}
