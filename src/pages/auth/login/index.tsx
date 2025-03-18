// @ts-ignore
import loginPageImg from "../../../assets/images/loginPageImg.png";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/auth";
import ColumnInput from "../../../components/columnInput";
import SubmitButton from "../../../components/submitButton";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "../../../api/auth";

export default function Login() {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  const handleSubmit = () => {
    console.log("email: " + email);
    console.log("password: " + password);
    mutate({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 835);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-safe h-safe justify-center items-center bg-gray-300">
      <div
        className={classNames(
          "flex justify-between w-[960px] h-[680px] bg-white rounded-xl pt-[177px] pb-[33px] pr-[130px] pl-[95px]",
          {
            "!justify-center !px-0 py-auto": isMobile,
          },
        )}
      >
        <div className="max-login-min-width:hidden">
          <img src={loginPageImg} alt="logo" />
        </div>
        <div className="flex flex-col items-center w-[290px] h-full">
          <span className="text-[#333] font-bold text-[28px] leading-[28.8px] mb-[54px]">
            Login
          </span>
          <div className="mb-2.5">
            <ColumnInput
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              svg={<Mail color="#333" fill="#e6e6e6" size={20} />}
            />
          </div>
          <div className="mb-2.5">
            <ColumnInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              svg={<Lock color="#333" fill="#e6e6e6" size={20} />}
            />
          </div>
          <div className="w-[290px] h-[70px] pt-5">
            <SubmitButton
              text={isPending ? "loading..." : "Log In"}
              onClick={handleSubmit}
            />
          </div>
          <div className="w-[290px] h-9 pt-3">
            <p className="tracking-wide text-center text-[#999999] leading-5 text-[13px]">
              Forgot{" "}
              <span className="text-[#666666] hover:text-[#57b846] cursor-pointer">
                Username / Password?
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
