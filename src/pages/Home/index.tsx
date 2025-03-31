import useAuthStore from "../../stores/auth";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {user} = useAuthStore();
  console.log(user);
  return <>
    <div>Home page</div>
    <div>welcome {user?.name}</div>
    <button onClick={() => navigate("/dashboard")}>Go to dashboard</button>
  </>
}
