import { Toaster } from "react-hot-toast";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const showRoutes = useRoutes(routes);
  // If user is not defined, show loader

  return (
    <>
      <Toaster position="top-right" />

      {showRoutes}
    </>
  );
}

export default App;
