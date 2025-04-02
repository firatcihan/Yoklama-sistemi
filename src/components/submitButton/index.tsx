interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | JSX.Element;
  bgColor?: string;
  color?: string;
  onHoverColor?: string;
  textIcon?: React.ReactNode | JSX.Element;
  textIconPosition?: "left" | "right";
}

export default function SubmitButton({
  text,
  bgColor = "#57b846",
  textIcon,
  color = "#fff",
  onHoverColor = "#333",
  textIconPosition = "right",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      className="w-full h-full !rounded-full flex items-center justify-center !transition-colors !duration-200"
      style={{ backgroundColor: bgColor, color: color }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = onHoverColor)
      }
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      <p className="text-[15px] sm:text-[18px] flex leading-[22.5px] font-semibold text-center">
        {textIcon && textIconPosition === "left" && (
          <span className="mr-2 sm:mr-3">{textIcon}</span>
        )}
        {text}
        {textIcon && textIconPosition === "right" && (
          <span className="ml-2 sm:ml-3">{textIcon}</span>
        )}
      </p>
    </button>
  );
}
