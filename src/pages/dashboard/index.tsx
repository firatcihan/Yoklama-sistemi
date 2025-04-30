import DashboardMain from "@/pages/dashboard/components/dashboardMain";

export default function Dashboard() {
  return (
    <div className="!bg-[#fff] h-safe">
      <p>
        manageAttendances / selectedLecture daki stat columsları ayarla önceki
        haftaya göre katılın oranları vs onları ekle
      </p>
      <DashboardMain />
    </div>
  );
}
