import axios from 'axios'
import { JWT_KEY } from './auth.service'

const instance = axios.create({
  baseURL: "https://uc.palomitas.fun"
})

// axios interceptor that injects the jwt token if there is one
instance.interceptors.request.use(config => {
  const token = localStorage.getItem(JWT_KEY);
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default instance;
