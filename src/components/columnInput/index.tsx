import { useState } from "react";
import classNames from "classnames";

interface ColumnInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  svg: JSX.Element;
}

export default function ColumnInput({
  placeholder,
  svg,
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
    </div>
  );
}
