import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('notelock_user'));

  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
