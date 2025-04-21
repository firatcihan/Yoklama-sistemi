import CloseButton from "@/components/closeButton";

export default function AssignHeader({ close }: { close: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[18px] font-semibold leading-6">
          Assign student to lectures
        </p>
      </div>
      <CloseButton close={close} />
    </div>
  );
}
