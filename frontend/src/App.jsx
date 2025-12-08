import { Navigate, Route, Routes } from "react-router";
import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isSignedIn ? <Navigate to={"/dashboard"} /> : <HomePage />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
    </>
  );
}

export default App;
