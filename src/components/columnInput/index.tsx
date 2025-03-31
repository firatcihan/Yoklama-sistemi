import { useState } from "react";
import classNames from "classnames";
import { CircleAlert } from "lucide-react";

interface ColumnInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  svg: JSX.Element;
  errors?: string;
}

export default function ColumnInput({
  placeholder,
  svg,
  errors,
  ...props
}: ColumnInputProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-[290px] h-[50px] z-0 relative">
      <input
        {...props}
        onClick={() => setClicked(true)}
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
        className="w-full h-full pr-[30px] pl-[68px] outline-none bg-[#e6e6e6] text-[#666666] rounded-full placeholder:font-semibold "
        placeholder={clicked ? "" : placeholder}
      />
      <div
        className={classNames(
          "absolute top-1/2 -translate-y-1/2 transition-all",
          {
            "left-8": !clicked,
            "left-6": clicked,
          },
        )}
      >
        {svg}
      </div>

      {errors && (
        <div className="absolute top-[50px] left-0 text-red-500 text-xs flex items-center">
          <CircleAlert className="w-4 h-4 mr-2" />
          {errors}
        </div>
      )}
    </div>
  );
}
