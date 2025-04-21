import { ColumnDef } from "@tanstack/react-table";
import { ClipboardPlus, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import DeleteButton from "@/components/Table/components/deleteButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import ViewButton from "@/components/Table/components/viewButton";
import EditButton from "@/components/Table/components/editButton";
import ActionsButton from "@/components/Table/components/actionsButton";

export type Teacher = {
  id: string;
  name: string;
  email: string;
  classes: string;
};

export const teacherColumns: ColumnDef<Teacher>[] = [
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
    accessorKey: "classes",
    header: "Classes",
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
            <ViewButton teacherId={row.original.id} />
            <DropdownMenuSeparator />
            <ActionsButton
              icon={<ClipboardPlus />}
              text="Assign Lecture"
              teacherId={row.original.id}
              modalName="teacherAssignLecture"
            />
            <DropdownMenuSeparator />
            <EditButton teacherId={row.original.id} />
            <DeleteButton teacherId={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
