import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = auth.getToken();
  const user = auth.getUser();

  if (!token || !user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={auth.getDashboardPath(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;
