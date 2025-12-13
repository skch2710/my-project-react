import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SideNav from "./pages/sidenav/SideNav";
import { getRoutesFromNavigation } from "./pages/sidenav/helper";
import IdleLogout from "./components/idleLogout/IdleLogout";

const App = () => {
  const navigations = useSelector((state) => state.user.navigations);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const apiRoutes = getRoutesFromNavigation(navigations);
  const routes = apiRoutes || [];

  const defaultPath = routes.length > 0 ? routes[0].path : "/";

  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={defaultPath} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* LOGIN (PUBLIC) */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED */}
        <Route element={<PrivateRoute />}>
          <Route element={<SideNav />}>
            {routes.map((route, index) => (
              <Route
                key={`${route.path}-${index}`}
                path={route.path}
                element={
                  route.element ? <route.element /> : <div>No Component</div>
                }
              />
            ))}

            {/* FALLBACK FOR AUTH USERS */}
            <Route path="*" element={<Navigate to={defaultPath} replace />} />
          </Route>
        </Route>
      </Routes>
      {isAuthenticated && <IdleLogout />}
    </BrowserRouter>
  );
};

export default App;
