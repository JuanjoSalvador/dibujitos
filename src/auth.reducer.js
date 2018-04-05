import authService from './auth.service'

// action creators
export const actions = {
  login: (token) => {
    localStorage.setItem(authService.JWT_KEY, token);
    const tokenData = authService.getTokenData(token);
    return {
      type: 'LOGIN',
      payload: tokenData
    };
  },
  logout: () => {
    localStorage.removeItem(authService.JWT_KEY)
    return {
      type: 'LOGOUT'
    }
  }
}

const storedToken = localStorage.getItem(authService.JWT_KEY);
const initialState = authService.getTokenData(storedToken)

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
export default reducer;
