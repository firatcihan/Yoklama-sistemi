interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bgColor?: string;
  color?: string;
  onHoverColor?: string;
}

export default function SubmitButton({
  text,
  bgColor = "#57b846",
  color = "#fff",
  onHoverColor = "#333",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      className="w-full h-full flex items-center justify-center rounded-full transition-colors duration-200"
      style={{ backgroundColor: bgColor, color: color }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = onHoverColor)
      }
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      <p className="leading-[22.5px] font-semibold text-[20px]">{text}</p>
    </button>
  );
}
