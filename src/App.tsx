import { Toaster } from "react-hot-toast";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import useModalStore from "@/stores/modal";
import { useEffect } from "react";

function App() {
  const showRoutes = useRoutes(routes);
  const { modal } = useModalStore();
  useEffect(() => {
    console.log(modal);
  }, [modal]);
  // If user is not defined, show loader

  return (
    <>
      <Toaster position="top-right" />

      {showRoutes}
    </>
  );
}

export default App;
