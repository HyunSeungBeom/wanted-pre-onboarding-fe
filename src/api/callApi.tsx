import axios from "axios";
import setupInterceptorsTo from "./interception";

const baseApi = axios.create({
  baseURL:
    "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/",
  timeout: 1000,
});

const callApi = setupInterceptorsTo(baseApi);

const createTodo = async (data: string) => {
  const res = await callApi.post("/todos", { todo: data });
  return res;
};

const getTodoApi = async () => {
  const res = await callApi.get("/todos");
  return res;
};

const updataTodoApi = async (
  id: number,
  data: string,
  isCompleted: boolean
) => {
  const res = await callApi.put(`/todos/${id}`, {
    todo: data,
    isCompleted: isCompleted,
  });
  return res;
};

const deleteTodoApi = async (id: number) => {
  const res = await callApi.delete(`/todos/${id}`);
  return res;
};

export const TodoApi = {
  createTodo: (data: string) => createTodo(data),
  getTodoApi: () => getTodoApi(),
  updataTodoApi: (id: number, data: string, isCompleted: boolean) =>
    updataTodoApi(id, data, isCompleted),
  deleteTodoApi: (id: number) => deleteTodoApi(id),
};
