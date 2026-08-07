import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/admin/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFoundPage from "../pages/NotFoundPage";

function MainRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Page Loading</div>;
  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/admin", element: <LoginPage /> },
  ];

  const privateRoutes = [{ path: "/", element: <DashboardPage /> }];

  const routesToShow = user ? privateRoutes : publicRoutes;

  return (
    <BrowserRouter>
      {user ? <Navbar /> : null}
      <Routes>
        {routesToShow.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default MainRoute;
