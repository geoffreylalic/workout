import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SideBar } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from "./contexts/auth/AuthProvider";
import { Workout } from "./pages/workouts/Workout";
import Home from "./pages/Home";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "workouts",
        element: <></>,
      },
      { path: "create-workout", element: <Workout /> },
      { path: "workouts/:workoutId", element: <Workout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
