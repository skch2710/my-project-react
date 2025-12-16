import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SideNav from "./pages/sidenav/SideNav";
import { getRoutesFromNavigation } from "./pages/sidenav/helper";
import IdleLogout from "./components/idleLogout/IdleLogout";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigations = useSelector((state) => state.user.navigations);

  const routes = getRoutesFromNavigation(navigations);

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        {/* PROTECTED */}
        <Route element={<PrivateRoute />}>
          <Route element={<SideNav />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            isAuthenticated ? <SideNav /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      {isAuthenticated && <IdleLogout />}
    </BrowserRouter>
  );
};

export default App;
