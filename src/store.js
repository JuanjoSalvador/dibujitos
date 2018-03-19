import { createStore } from 'redux'
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
const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

const store = createStore(reducer, initialState);

export default store;
