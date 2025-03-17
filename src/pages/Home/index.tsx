import useAuthStore from "../../stores/auth";

export default function Home() {
  const {user} = useAuthStore();
  console.log(user);
  return <div>Home page</div>;
}
