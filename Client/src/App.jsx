import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { AuthProvider } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <UserDashboard />
      </AuthProvider>
    ),
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
