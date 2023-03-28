const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (user) => ({
    type: actions.LOGIN_REQUEST,
    payload: { user },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  loginSuccess: (payload) => ({
    type: actions.LOGIN_SUCCESS,
    idToken: payload.idToken,
    user: payload.user,
  }),
};
export default actions;
