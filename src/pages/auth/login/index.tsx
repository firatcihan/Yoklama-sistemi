import { useState } from "react";
import ColumnInput from "../../../components/columnInput";
import SubmitButton from "../../../components/submitButton";
import { Mail, Lock, CalendarClock } from "lucide-react";
import { useLogin } from "@/api/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { BeatLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const { mutate: loginMut, isPending } = useLogin();

  const handleSubmit = () => {
    const form = { email, password };
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const errs: typeof errors = {};
      result.error.issues.forEach((i) => {
        if (i.path[0] === "email") errs.email = i.message;
        if (i.path[0] === "password") errs.password = i.message;
      });
      return setErrors(errs);
    }
    setErrors({});
    loginMut(form, {
      onSuccess: () => {
        navigate(redirectTo, { replace: true });
      },
    });
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="flex justify-center">
          <CalendarClock className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Attendance System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your classes and attendance
        </p>
      </div>

      <div className="mt-4 w-[350px] mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-lg py-8 px-4 shadow-lg  sm:px-10">
          <div className="mb-6">
            <p className="text-gray-700 font-medium text-sm mb-1">
              Email address
            </p>
            <ColumnInput
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"email"}
              svg={<Mail color="#9ca3af" fill="#fff" size={20} />}
              type="text"
              errors={errors.email}
            />
          </div>
          <div className="mb-6">
            <p className="text-gray-700 font-medium text-sm mb-1">Password</p>
            <ColumnInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"password"}
              svg={<Lock color="#9ca3af" fill="#fff" size={20} />}
              type="password"
              errors={errors.password}
            />
          </div>
          <div className="mb-5">
            <SubmitButton
              bgColor="#155dfc"
              onHoverColor="#0e4bbf"
              onClick={handleSubmit}
              className="mt-6"
              text={
                isPending ? (
                  <div>
                    <BeatLoader color="#fff" />
                  </div>
                ) : (
                  "Sign In"
                )
              }
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm mb-6">
              <span className="px-2 bg-white text-gray-500">
                Don't have an Account?
              </span>
            </div>
          </div>
          <div>
            <p className="text-gray-600">
              Reach to your instructor to create an account for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
