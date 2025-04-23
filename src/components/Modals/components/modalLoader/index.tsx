import { PulseLoader } from "react-spinners";

export default function ModalLoader({
  extraClasses,
}: {
  extraClasses?: string;
}) {
  return (
    <div
      className={`${extraClasses} flex items-center justify-center h-full w-full p-10`}
    >
      <PulseLoader size={30} color="#1e376d" />
    </div>
  );
}
