import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import FormLabel from "@/components/Modals/create/createAttendance/createAttendanceForm/formLabel";
import useGetTeacherAssignedClasses from "@/api/dashboard/teachers/getTeacherAssignedClasses.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";
import useAuthStore from "@/stores/auth";
import { RawLecture } from "@/api/dashboard/lectures/lectureInterface.ts";

export default function SelectLecture({
  func,
}: {
  func: (value: RawLecture | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { user } = useAuthStore();
  const {
    data: lectureData,
    isPending,
    isSuccess,
  } = useGetTeacherAssignedClasses({
    id: user ? user.id : "",
  });

  if (isPending) {
    return <ModalLoader extraClasses="!p-3" />;
  }

  if (isSuccess && lectureData) {
    return (
      <div>
        <FormLabel text="Select Lecture" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between dontClose !border-[#d1d5db] !outline-none hover:!border-black"
            >
              {value
                ? lectureData.find((lecture) => lecture.name === value)?.name
                : "Select Lecture..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 dontClose">
            <Command>
              <CommandInput placeholder="Search lecture..." />
              <CommandList>
                <CommandEmpty>You are not Assigned to a lecture.</CommandEmpty>
                <CommandGroup>
                  {lectureData.map((lecture) => (
                    <CommandItem
                      key={lecture.id}
                      value={lecture.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        func(
                          currentValue === value
                            ? undefined
                            : lectureData.find(
                                (lecture): lecture is RawLecture =>
                                  lecture.name === currentValue,
                              ),
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === lecture.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {lecture.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
