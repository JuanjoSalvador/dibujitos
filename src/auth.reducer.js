import { JWT_KEY, getTokenData } from './auth.service'

// action creators
export const actions = {
  login: (token) => {
    localStorage.setItem(JWT_KEY, token);
    const tokenData = getTokenData(token);
    return {
      type: 'LOGIN',
      payload: tokenData
    };
  },
  logout: () => {
    localStorage.removeItem(JWT_KEY)
    return {
      type: 'LOGOUT'
    }
  }
}

const storedToken = localStorage.getItem(JWT_KEY);
const initialState = getTokenData(storedToken)

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
