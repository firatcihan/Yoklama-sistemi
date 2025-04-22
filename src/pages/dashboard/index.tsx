import SubmitButton from "../../components/submitButton";
import { CalendarCheck2, PenLine, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";

export default function Dashboard() {
  const { user } = useAuthStore();
  console.log(user);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-2">
      <div className="w-full h-[100px] bg-[#f7f8f9] rounded-full flex items-center justify-center py-5 px-7 mb-7">
        <SubmitButton
          text={"Yoklama Oluştur"}
          textIcon={<PenLine size={24} />}
          bgColor="#1e376d"
          onHoverColor="#2e4d8f"
        />
      </div>
      <div className="w-full h-[100px] bg-[#f7f8f9] rounded-full flex items-center justify-center py-5 px-7 mb-7">
        <SubmitButton
          onClick={() => {
            navigate(`/dashboard/lectures/${user?.id}`);
          }}
          text={`Dersleri Yönet`}
          textIcon={<CalendarCheck2 size={24} />}
          bgColor="#1e376d"
          onHoverColor="#2e4d8f"
        />
      </div>
      <div className="w-full h-[100px] bg-[#f7f8f9] rounded-full flex items-center justify-center py-5 px-7 mb-7">
        <SubmitButton
          onClick={() => {
            navigate(`/dashboard/students`);
          }}
          text={"Öğrencileri Yönet"}
          textIcon={<UserRoundPen size={24} />}
          bgColor="#1e376d"
          onHoverColor="#2e4d8f"
        />
      </div>
      {user?.role === "admin" && (
        <div className="w-full h-[100px] bg-[#f7f8f9] rounded-full flex items-center justify-center py-5 px-7 mb-7">
          <SubmitButton
            onClick={() => {
              navigate(`/dashboard/teachers`);
            }}
            text={"Öğretmenleri Yönet"}
            textIcon={<UserRoundPen size={24} />}
            bgColor="#1e376d"
            onHoverColor="#2e4d8f"
          />
        </div>
      )}
      <div>
        derslere atama yapma kayıt silme işlerini hallet,derslere eğer öğretmen
        atanmışsa o dersi atamak için gösterme veya atandığını belirt ,dersler
        hangi günlerde işlencek veritabanını ayarla, backendde fonksiyonlara
        ayır derse ata, dersten çıkar vb...
      </div>
    </div>
  );
}
