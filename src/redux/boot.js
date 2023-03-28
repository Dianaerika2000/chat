import { store } from './store';
import authActions from './auth/actions';

/**
 * Check if user is logged in or not and dispatches LOGIN_SUCCESS or LOGIN_ERROR.
 */
export default function Boot() {
  return new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
}
