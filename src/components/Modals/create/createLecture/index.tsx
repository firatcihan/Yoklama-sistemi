import CreateHeader from "@/components/Modals/create/components/createHeader";
import CreateLectureForm from "@/components/Modals/create/createLecture/createLectureForm";

export default function CreateLectureModal({ close }: { close: () => void }) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <CreateHeader close={close} />
      <CreateLectureForm close={close} />
    </div>
  );
}
