import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/admin/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFoundPage from "../pages/NotFoundPage";
import LoadingPage from "../pages/LoadingPage";
import InfractionsPage from "../pages/admin/InfractionsPage";
import ComputerList from "../pages/admin/ComputerList";
import NetworkTest from "../pages/admin/NetworkTest";
import NetworkTestPage from "../pages/admin/NetworkTestPage";
import NetworkTestBlocked from "../pages/user/FailedTest";
import NetworkTestWindow from "../pages/user/NetworkTestWindow";
import NetworkTestConcludedPage from "../pages/user/TestCompleted";
import ProfilePage from "../pages/admin/ProfilePage";

function MainRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage />;
  const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/admin", element: <LoginPage /> },
    { path: "/network-test-blocked", element: <NetworkTestBlocked /> },
    { path: "/network-test", element: <NetworkTestWindow /> },
    { path: "/concluded", element: <NetworkTestConcludedPage /> },
  ];

  const privateRoutes = [
    { path: "/", element: <DashboardPage /> },
    { path: "/infractions", element: <InfractionsPage /> },
    { path: "/computers", element: <ComputerList /> },
    { path: "/network-tests", element: <NetworkTest /> },
    { path: "/network-tests/:id", element: <NetworkTestPage /> },
    { path: "/profile", element: <ProfilePage centre={user as any} /> },
  ];

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
