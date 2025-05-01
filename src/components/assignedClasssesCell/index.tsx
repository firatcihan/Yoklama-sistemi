import * as React from "react";
import { Button } from "@/components/ui/button";
import { ClassBadge } from "@/components/assignedClasssesCell/classBadge";
import { PlusCircle, MinusCircle } from "lucide-react";

interface AssignedClassesCellProps {
  value: string | string[];
  maxVisible?: number;
}

export function AssignedClassesCell({
  value,
  maxVisible = 3,
}: AssignedClassesCellProps) {
  const [expanded, setExpanded] = React.useState(false);

  // Convert value to array if it's a string
  const classesArray = React.useMemo(() => {
    if (!value) return [];
    if (typeof value === "string") {
      return value.split(/,\s*/);
    }
    return value;
  }, [value]);

  // Filter out empty strings
  const classes = classesArray.filter(Boolean);

  // Determine if we need to show the expand button
  const needsExpansion = classes.length > maxVisible;

  // Get the classes to display based on expanded state
  const displayClasses = expanded ? classes : classes.slice(0, maxVisible);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (classes.length === 0) {
    return (
      <span className="text-muted-foreground text-sm italic">
        No classes assigned
      </span>
    );
  }

  return (
    <div className="group">
      <div className="flex flex-wrap max-w-[250px]">
        {displayClasses.map((classCode, index) => (
          <ClassBadge
            key={`${classCode}-${index}`}
            code={classCode.trim()}
            index={index}
          />
        ))}

        {needsExpansion && !expanded && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-2 text-xs text-muted-foreground hover:text-foreground group-hover:bg-secondary"
            onClick={toggleExpanded}
          >
            <PlusCircle className="h-3 w-3 mr-1" />
            {classes.length - maxVisible} more
          </Button>
        )}
      </div>

      {expanded && needsExpansion && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-5 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={toggleExpanded}
        >
          <MinusCircle className="h-3 w-3 mr-1" />
          Show less
        </Button>
      )}
    </div>
  );
}
