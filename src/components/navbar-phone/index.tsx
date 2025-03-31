import { Menu } from "lucide-react";
import { images } from "../../mock/images.tsx";
import { useNavigate } from "react-router-dom";

export default function NavbarPhone() {
  const navigate = useNavigate();
  return (
    <div className="w-[384px] h-[80px] px-[35px] p-[15px] mt-5 mx-auto flex justify-between bg-[#f7f8f9] rounded-full">
      <div className="w-[53px] h-[53px] hover:bg-[#172b4d] hover:text-[#fff] bg-[#f7f8f9] text-[#172b4d] rounded-xl border-2 border-[#172b4d] flex items-center justify-center transition-colors">
        <Menu size={40} />
      </div>
      <div
        onClick={() => navigate("/dashboard")}
        className="w-[80px] h-[53px] flex items-center justify-center group cursor-pointer"
      >
        <img
          className="w-[53px] h-[53px] group-hover:scale-105 transition-transform"
          alt="logo"
          src={images.pirireisLogo}
        />
      </div>
    </div>
  );
}
