import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router";
import { SideBar } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from "./contexts/auth/AuthProvider";
import { Workout } from "./pages/workouts/Workout";
import Home from "./pages/Home";
import { CreateWorkout } from "./pages/workouts/CreateWorkout";
import { SignUp } from "./pages/Signup";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<SideBar />}>
                <Route element={<CreateWorkout />}>
                  <Route index element={<Home />} />
                  <Route path="workouts" element={<></>} />
                  <Route path="workouts/:workoutId" element={<Workout />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
