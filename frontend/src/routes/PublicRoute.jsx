import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/common/Spinner";

const PublicRoute = () => {
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="auth-grid min-h-screen">
        <Spinner label="Loading..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;