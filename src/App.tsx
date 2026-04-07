import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import routes from "./routes";
import { useAppSelector } from "./store/hooks";

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
