import http from "axios";
import { getMessage } from "../config/handleApiError";

const httpInstance = http.create();
httpInstance.defaults.baseURL = "http://localhost:3001/api"

const signUp = async (data) => {
  try {
    const response = await httpInstance.post("/users", data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const login = async (data) => {
  try {
    const response = await httpInstance.post('/sign-in', data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const AuthService = {
  signUp: signUp,
  login: login
};

export default AuthService;


