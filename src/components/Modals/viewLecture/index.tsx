import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import useModalStore from "@/stores/modal";
import ViewLectureHeader from "@/components/Modals/viewLecture/viewLectureHeader";
import ViewLectureInfoColumn from "@/components/Modals/viewLecture/viewLectureInfoColumn";
import { ModalProps } from "@/components/Modals/allModals.ts";

export default function ViewLecture({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: lectureData } = useGetLectureById({
    id: modal && modal.data ? modal.data : "",
  });
  if (!lectureData) return <div>Ders ile ilgili veri bulunamadı...</div>;

  return (
    <div className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] bg-white rounded-lg shadow-lg flex flex-col relative p-6">
      <ViewLectureHeader close={close} lectureData={lectureData} />
      <ViewLectureInfoColumn
        text="Ders Kodu: "
        text2={lectureData.lectureCode}
      />
      <ViewLectureInfoColumn
        text="Ders ID: "
        text2={lectureData.id}
      />
        <ViewLectureInfoColumn
            text="Derse Atanan Öğretmen: "
            text2={lectureData.instructor.name + " (" + lectureData.instructor.email + ")" || "Atanmadı" }
        />
    </div>
  );
}
