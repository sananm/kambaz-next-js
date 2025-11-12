import axios from "axios";
import { Todo, Assignment } from "./types";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get<string>(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchAssignment = async (): Promise<Assignment> => {
  const response = await axios.get<Assignment>(`${ASSIGNMENT_API}`);
  return response.data;
};

export const updateTitle = async (title: string): Promise<Assignment> => {
  const response = await axios.get<Assignment>(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(TODOS_API);
  return response.data;
};

export const removeTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const createNewTodo = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/create`);
  return response.data;
};

export const postNewTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await axios.post<Todo>(`${TODOS_API}`, todo);
  return response.data;
};

export const deleteTodo = async (todo: Todo): Promise<void> => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};