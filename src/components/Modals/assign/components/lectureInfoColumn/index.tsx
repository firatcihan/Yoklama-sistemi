interface LectureInfoColumnProps {
  lectureName: string;
  lectureCode: string;
}

export default function LectureInfoColumn({
  lectureName,
  lectureCode,
}: LectureInfoColumnProps) {
  return (
    <div className="rounded-md bg-blue-50 p-4 mb-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            lecture Information
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p className="font-medium">{lectureName}</p>
            <p>Lecture Code: {lectureCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
