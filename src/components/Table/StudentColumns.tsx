import { ColumnDef } from "@tanstack/react-table";
import { ClipboardPlus, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteButton from "@/components/Table/components/deleteButton";
import ViewButton from "@/components/Table/components/viewButton";
import EditButton from "@/components/Table/components/editButton";
import ActionsButton from "@/components/Table/components/actionsButton";

export type Student = {
  id: string;
  name: string;
  email: string;
  assignedClasses: string;
  studentNumber: string;
};

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "assignedClasses",
    header: "Assigned Classes",
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <ViewButton studentId={row.original.id} />
            <DropdownMenuSeparator />
            <ActionsButton
              icon={<ClipboardPlus />}
              text="Assign Lecture"
              studentId={row.original.id}
              modalName="studentAssignLecture"
            />
            <DropdownMenuSeparator />
            <EditButton studentId={row.original.id} />
            <DeleteButton studentId={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
