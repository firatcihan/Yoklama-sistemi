interface UserInfoColumnProps {
  name: string;
  studentNumber?: string;
  email: string;
}

export default function UserInfoColumn({
  name,
  studentNumber,
  email,
}: UserInfoColumnProps) {
  return (
    <div className="rounded-md bg-blue-50 p-4 mb-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            {studentNumber ? "Student Information" : "Teacher Information"}
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p className="font-medium">{name}</p>
            {studentNumber && <p>Student Number: {studentNumber}</p>}
            <p>email: {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
