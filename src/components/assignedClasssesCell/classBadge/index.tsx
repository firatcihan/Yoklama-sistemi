import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ClassBadgeProps {
  code: string;
  className?: string;
  longName?: string;
  index?: number;
}

export function ClassBadge({
  code,
  className,
  longName,
  index,
}: ClassBadgeProps) {
  const variant = "outline";
  const badgeClassName = cn(
    "mr-1 mb-1 whitespace-nowrap transition-all",
    {
      "animate-in fade-in zoom-in": index !== undefined,
      "delay-100": index === 1,
      "delay-150": index === 2,
      "delay-200": index === 3,
    },
    className,
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={badgeClassName}>
            {code}
          </Badge>
        </TooltipTrigger>
        {longName && (
          <TooltipContent side="top">
            <p>{longName}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
