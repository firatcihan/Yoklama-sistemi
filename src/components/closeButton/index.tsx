import { X } from "lucide-react";

export default function CloseButton({ close }: { close: () => void }) {
  return (
    <div
      onClick={() => close()}
      className="flex items-center justify-center p-1 !rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
    >
      <X color="#6b7280" size={23} />
    </div>
  );
}
