export default function DashboardInfo() {
  return (
    <div className="sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Total Students
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          87
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Active Lectures
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          33
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">Teachers</p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          21
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Today's Sessions
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          0
        </p>
      </div>
    </div>
  );
}
