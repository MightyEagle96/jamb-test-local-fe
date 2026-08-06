import React from "react";
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/admin/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function MainRoute() {
  const adminRoutes = [{ path: "/", element: <LoginPage /> }];

  const userRoutes = [{ path: "/", element: <HomePage /> }];
  return (
    <BrowserRouter>
      <Routes>
        {/* {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))} */}
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;
