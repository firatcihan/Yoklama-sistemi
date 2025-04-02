import { useState, useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/auth";
import ColumnInput from "../../../components/columnInput";
import SubmitButton from "../../../components/submitButton";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "@/api/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { BeatLoader } from "react-spinners";
import {images} from "@/mock/images.tsx";

export default function Login() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending } = useLogin();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = () => {
    const formData = { email, password };

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") newErrors.email = issue.message;
        if (issue.path[0] === "password") newErrors.password = issue.message;
      });
      setErrors(newErrors);
    }

    if (result.success) {
      setErrors({});
      mutate({ email, password });
    }
  };

  useEffect(() => {
    if (user) {
      user.role === "admin" ? navigate("/dashboard") : navigate("/");
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
        <div className="hidden sm:block" style={{maxWidth: "835px"}}>
          <img src={images.loginPageImg} alt="logo"/>
        </div>
        <div className="flex flex-col items-center w-[290px] h-full">
          <span className="text-[#333] font-bold text-[28px] leading-[28.8px] mb-[54px]">
            Login
          </span>
          <div className="mb-5">
            <ColumnInput
              errors={errors.email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              svg={<Mail color="#333" fill="#e6e6e6" size={20} />}
            />
          </div>
          <div className="mb-2.5">
            <ColumnInput
              errors={errors.password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              svg={<Lock color="#333" fill="#e6e6e6" size={20} />}
            />
          </div>
          <div className="w-[290px] h-[70px] pt-5">
            <SubmitButton
              text={isPending ? <BeatLoader color={"#fff"} /> : "Log In"}
              onClick={handleSubmit}
              bgColor="#1e376d"
              onHoverColor="#2e4d8f"
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
