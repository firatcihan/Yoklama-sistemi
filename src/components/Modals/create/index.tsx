import CreateHeader from "@/components/Modals/create/createHeader";
import CreateForm from "@/components/Modals/create/createForm";

export default function CreateModal({ close }: { close: () => void }) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <CreateHeader close={close} />
      <CreateForm close={close} />
    </div>
  );
}
