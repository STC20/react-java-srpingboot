import { api } from "./api";

export const getUsers = () => api.get("/users");

export const createUser = (user: {
  name: string;
  email: string;
}) => api.post("/users", user);

export const deleteUser = (id: number) =>
  api.delete(`/users/${id}`);