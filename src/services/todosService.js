import http from "axios";
import { getMessage } from "../config/handleApiError";

const httpInstance = http.create();
httpInstance.defaults.baseURL = "http://localhost:3001/api";
httpInstance.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem('user'));

  config.headers = { ...config.headers, authorization: `Bearer ${user.token}` };

  return config;
});

const listTodos = async () => {
  try {
    const response = await httpInstance.get("/todos");
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const addTodo = async (data) => {
  try {
    const response = await httpInstance.post("/todos", data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const editTodo = async (data, id) => {
  try {
    const response = await httpInstance.put(`/todos/${id}`, data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const deleteTodo = async (id) => {
  try {
    const response = await httpInstance.delete(`/todos/${id}`);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(getMessage(e));
  }
}

const TodosService = {
  listTodos: listTodos,
  addTodo: addTodo,
  editTodo: editTodo,
  deleteTodo: deleteTodo
}

export default TodosService;
