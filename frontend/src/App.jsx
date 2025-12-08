import { Navigate, Route, Routes } from "react-router";
import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/problems"
        element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
      />
    </Routes>

    <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
    </>
  );
}

export default App;
