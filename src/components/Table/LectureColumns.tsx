import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Lecture = {
  id: string;
  name: string;
  lectureCode: string;
  participants: {
    studentNumber: string;
    name: string;
  }[];
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  participantsCount: string;
};

export const lectureColumns: ColumnDef<Lecture>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: () => {
      return <div className="flex ml-5">Lecture name</div>;
    },
    cell: ({ row }) => {
      return <div className="flex ml-5">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "participantsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Participants Count
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <div>{row.original.participantsCount}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    accessorFn: (row) => row.instructor.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Instructor
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const instructor = row.original.instructor;
      return (
        <div className="flex flex-col items-center space-x-2">
          <div className="text-sm font-medium">{instructor.name || "Ders Atanmamış"}</div>
          <div className="text-xs text-muted-foreground">
            {instructor.email}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "lectureCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lecture Code
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <div>{row.original.lectureCode}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lecture = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("Lecture ID copied:", lecture.id)}
            >
              Copy lecture id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Student</DropdownMenuItem>
            <DropdownMenuItem>View Student Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
