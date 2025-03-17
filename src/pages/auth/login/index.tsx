import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/auth";

export default function Login() {
    const { user, setUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col w-[250px] h-[250px] justify-center bg-gray-300">
            <p className="text-center">Login page </p>
            <button
                className="bg-blue-500 text-white p-2 rounded-md mx-auto mt-5 w-[150px]"
                onClick={() => {
                    setUser({
                        email: "firat@hotmail.com",
                        id: "1",
                        role: "admin",
                        name: "firat",
                    });
                }}
            >
                Login
            </button>
        </div>
    );
}