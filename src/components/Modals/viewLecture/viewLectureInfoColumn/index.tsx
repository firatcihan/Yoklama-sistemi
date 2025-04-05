export default function ViewLectureInfoColumn({
  text,
  text2,
}: {
  text: string;
  text2: string;
}) {
  return (
      <div className="mt-3 flex">
          <div className="font-normal text-lg w-[35%]">{text}</div>
          <div className="font-semibold text-lg w-[65%] ml-3">{text2}</div>
      </div>
  );
}
