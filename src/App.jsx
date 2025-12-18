import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SideNav from "./pages/sidenav/SideNav";
import NotFound from "./pages/notfound/NotFound";
import IdleLogout from "./components/idleLogout/IdleLogout";
import AppInitializer from "./bootstrap/AppInitializer";
import { getRoutesFromNavigation } from "./pages/sidenav/helper";

const App = () => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const navigations = useSelector((s) => s.user.navigations);

  // Dynamic routes (paths already normalized)
  const routes = useMemo(
    () => getRoutesFromNavigation(navigations),
    [navigations]
  );

  return (
    <BrowserRouter>
      <AppInitializer>
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
              {/* INDEX ROUTE (CRITICAL) */}
              <Route
                index
                element={
                  routes.length ? (
                    <Navigate to={routes[0].path} replace />
                  ) : (
                    <NotFound />
                  )
                }
              />

              {routes.map((route, index) => {
                const Element = route.element;
                return (
                  <Route key={index} path={route.path} element={<Element />} />
                );
              })}

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* PUBLIC FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {isAuthenticated && <IdleLogout />}
      </AppInitializer>
    </BrowserRouter>
  );
};

export default App;