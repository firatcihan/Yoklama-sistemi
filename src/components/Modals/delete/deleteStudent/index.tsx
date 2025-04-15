import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Trash2 } from "lucide-react";
import useGetStudentById from "@/api/dashboard/students/getStudentById.ts";
import useModalStore from "@/stores/modal";
import { Input } from "@/components/ui/input.tsx";
import { BeatLoader, PulseLoader } from "react-spinners";
import useDeleteStudent from "@/api/dashboard/students/deleteStudent.ts";

export default function DeleteStudentModal({ close }: { close: () => void }) {
    const [studentName, setStudentName] = React.useState<string>("");
    const { modal } = useModalStore();
    const { mutate: deleteStudent, isPending: pendingDeleteStudent } =
        useDeleteStudent();
    const {
        data: studentToDelete,
        isPending,
        isSuccess,
    } = useGetStudentById({ id: !modal ? "" : modal.data ? modal.data : "" });

    return (
        <div className="w-[350px] sm:w-[450px] bg-white rounded-lg shadow-lg p-4 flex flex-col">
            {isPending && (
                <div className="h-[200px] flex items-center justify-center">
                    <PulseLoader color="#1e376d" size={24} />
                </div>
            )}
            {isSuccess && (
                <>
                    <div className="font-semibold text-[20px] mb-4">
                        {studentToDelete?.name} silinsin mi?
                    </div>
                    <hr className="mb-4" />
                    <div className="text-[15px] mb-6">
                        Bu işlem Öğrenciyi kalıcı olarak silecektir.
                        <br />
                        <span className="font-semibold">
              Silinen Öğrenci geri alınamaz.
            </span>
                    </div>
                    {studentToDelete.assignedClasses.length > 0 && (
                        <div className="text-red-500 mb-4">
                            Bu öğrencinin kayıtlı olduğu dersler var. <br />
                            Öğrenci Derslerden silinecektir.
                            <div className="flex items-center">
                                {studentToDelete.assignedClasses.map((item) => (
                                    <div key={item} className="text-[15px] mr-2 tex-red-500">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mb-5 w-[70%] h-[70%]">
                        <p>Öğrencinin ismini giriniz:</p>
                        <Input
                            value={studentName}
                            onChange={(e) => {
                                setStudentName(e.target.value);
                            }}
                            placeholder={studentToDelete?.name}
                        />
                    </div>
                    <div className="flex item-center justify-end">
                        <Button onClick={() => close()} variant="outline">
                            Vazgeç
                        </Button>
                        <Button
                            onClick={() => {
                                if (studentName === studentToDelete?.name) {
                                    deleteStudent({
                                        id: studentToDelete?.id,
                                    });
                                }
                            }}
                            disabled={studentName !== studentToDelete?.name}
                            variant="outline"
                            className="ml-3 !bg-[#f93a37] text-white"
                        >
                            {pendingDeleteStudent ? (
                                <BeatLoader color="white" />
                            ) : (
                                <>
                                    <Trash2 /> Öğrenciyi Sil
                                </>
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
