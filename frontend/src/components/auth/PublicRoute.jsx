import { Navigate } from 'react-router-dom';
import auth from '../../utils/auth';

const PublicRoute = ({ children }) => {
  const token = auth.getToken();
  const user = auth.getUser();

  if (token && user?.role) {
    return <Navigate to={auth.getDashboardPath(user.role)} replace />;
  }

  return children;
};

export default PublicRoute;
