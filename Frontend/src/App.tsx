import React, { type FC,  Suspense } from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoaderPage from "./components/common/loader/loader";
import { adminRoutes } from "./routes/routesConfig";
import { useSelector } from "react-redux";
const SignInPage = React.lazy(() => import("./pages/authentication/sign-in"));
const ResetPasswordPage = React.lazy(() => import("./pages/authentication/reset-password"));
const PageNotFound = React.lazy(() => import("./components/pagenotfound/pagenotfound"));

const App: FC = function () {
  const isAuthenticated = useSelector((state: any) => state.Login.Logincode?.success);
  return (
    <Suspense fallback={<LoaderPage /> }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            {adminRoutes && adminRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          <Route path="/login" element={<SignInPage />} index />
          <Route path="/reset-password/:token/:id" element={<ResetPasswordPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;