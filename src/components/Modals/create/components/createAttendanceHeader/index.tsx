import CloseButton from "@/components/closeButton";
import XSeparator from "@/components/XSeparator";

export default function CreateAttendanceHeader({
  close,
}: {
  close: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <p className="text-[20px] font-semibold leading-7">Create Attendance</p>
        <div>
          <CloseButton close={close} />
        </div>
      </div>
      <XSeparator extraClasses="!mt-0 w-[100%] mb-4" />
    </div>
  );
}
