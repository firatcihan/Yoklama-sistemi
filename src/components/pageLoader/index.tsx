import { CalendarClock } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col items-center mt-10">
        <CalendarClock className="max-sm:w-[300px] max-sm:h-[300px] w-[400px] h-[400px] text-blue-700 animate-pulse duration-50" />
        <div className="text-[30px] text-blue-700 font-semibold mt-4 animate-pulse duration-50">
          Loading...
        </div>
      </div>
    </div>
  );
}
