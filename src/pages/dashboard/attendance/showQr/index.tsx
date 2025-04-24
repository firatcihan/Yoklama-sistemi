import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import useAuthStore from "@/stores/auth";

export default function ShowQr() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();
  const { user } = useAuthStore();

  const sessionUrl = `${import.meta.env.VITE_FRONTEND_URL}/attendance/${lectureCode}/${sessionId}`;
  //dersin öğretmeni bu kişi değilse geri döndür
  if (!user) return;
  if (user.role === "student") {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50 mt-4">
        <h1 className="!text-2xl font-semibold">
          Bu sayfaya erişim yetkiniz yok.
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 mt-4">
      <h1 className="!text-2xl font-semibold">
        {lectureCode} Dersi yoklama QR Kodu
      </h1>
      <div className="p-4 bg-white rounded-lg shadow mt-3">
        <QRCode value={sessionUrl} size={450} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Bu kodu okutup katılımcılar yönlendirilecektir.
      </p>
    </div>
  );
}
