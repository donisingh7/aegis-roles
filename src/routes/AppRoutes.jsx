import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/auth/Login';
import WholesaleHome from '../features/wholesale/WholesaleHome';
import SuperHome     from '../features/super/SuperHome';
import MasterHome    from '../features/master/MasterHome';
import PlayerHome    from '../features/player/PlayerHome';
import AdminHome     from '../features/admin/AdminHome';
import { isLoggedIn, getUserType } from '../utils/auth';

export default function AppRoutes() {
  const userType = getUserType();

  const getHomeRoute = (type) => {
    if (!type) return "/login";
    return "/" + type.split('_')[0];
  };

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/wholesale"
          element={isLoggedIn() && userType === 'wholesale_user'
            ? <WholesaleHome />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/super"
          element={isLoggedIn() && userType === 'super_user'
            ? <SuperHome />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/master"
          element={isLoggedIn() && userType === 'master_user'
            ? <MasterHome />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/player"
          element={isLoggedIn() && userType === 'player_user'
            ? <PlayerHome />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={isLoggedIn() && userType === 'admin_user'
            ? <AdminHome />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={isLoggedIn()
            ? <Navigate to={getHomeRoute(userType)} replace />
            : <Navigate to="/login" replace />}
        />
      </Routes>
  );
}
