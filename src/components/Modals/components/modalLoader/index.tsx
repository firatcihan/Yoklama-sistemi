import { PulseLoader } from "react-spinners";

export default function ModalLoader({
  extraClasses,
  color = "#1e376d",
}: {
  extraClasses?: string;
  color?: string;
}) {
  return (
    <div
      className={`${extraClasses} flex items-center justify-center h-full w-full`}
    >
      <PulseLoader size={30} color={color} />
    </div>
  );
}
