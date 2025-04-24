import { CheckCircle2, XCircle } from "lucide-react";

export default function RecentClasses() {
  const mock = [
    {
      id: 1,
      subject: "Web Development Fundamentals",
      date: "2024-03-18",
      status: "Present",
    },
    {
      id: 2,
      subject: "Data Structures and Algorithms",
      date: "2024-03-17",
      status: "Absent",
    },
    {
      id: 3,
      subject: "Database Management Systems",
      date: "2024-03-16",
      status: "Present",
    },
    {
      id: 4,
      subject: "Operating Systems",
      date: "2024-03-15",
      status: "Absent",
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Attendance
      </h2>
      {mock.map((cls) => (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 !border-b last:border-0">
            <div className="flex items-center space-x-3">
              {cls.status === "Present" ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium text-gray-900">{cls.subject}</p>
                <p className="text-sm text-gray-500">{cls.date}</p>
              </div>
            </div>
            {cls.status === "Present" ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                Present
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                Absent
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
