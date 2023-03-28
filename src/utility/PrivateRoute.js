import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * Checks if user is logged ir or not and redirects to the homepage.
 * @param children
 * @returns {JSX.Element|*}
 * @constructor
 */
export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
