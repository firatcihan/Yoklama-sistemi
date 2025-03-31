interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | JSX.Element;
  bgColor?: string;
  color?: string;
  onHoverColor?: string;
  textIcon?: React.ReactNode | JSX.Element;
}

export default function SubmitButton({
  text,
  bgColor = "#57b846",
  textIcon,
  color = "#fff",
  onHoverColor = "#333",
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
      <p className="flex leading-[22.5px] font-semibold text-[20px]">
        {text} {textIcon && <span className="ml-3">{textIcon}</span>}
      </p>
    </button>
  );
}
