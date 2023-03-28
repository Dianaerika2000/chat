import actions from './actions';
const initState = {
  idToken: null,
  user: null,
};
export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        user: action.user,
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
