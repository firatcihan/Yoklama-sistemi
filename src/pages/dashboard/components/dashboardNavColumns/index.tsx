import { useNavigate } from "react-router-dom";
import useModalStore from "@/stores/modal";

interface DashboardNavColumnsProps {
  route?: string;
  text: string;
  desc: string;
  icon: JSX.Element;
  modalProps?: {
    name: string;
    data: any;
  };
}

export default function DashboardNavColumns({
  route,
  modalProps,
  text,
  desc,
  icon,
}: DashboardNavColumnsProps) {
  const { setModal } = useModalStore();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (route) navigate(route);
        if (modalProps)
          setModal({ name: modalProps.name, data: modalProps.data });
      }}
      className="w-full bg-white border !border-[#e5e7eb] rounded-xl cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {text}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
