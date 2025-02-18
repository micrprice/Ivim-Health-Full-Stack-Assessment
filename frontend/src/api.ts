import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/notes",
});

export const getNotes = () => api.get("/");
export const getNote = (id: string) => api.get(`/${id}`);
export const createNote = (note: { title: string; content: string }) =>
  api.post("/", note);
export const updateNote = (id: string, note: { title: string; content: string }) =>
  api.put(`/${id}`, note);
export const deleteNote = (id: string) => api.delete(`/${id}`);

export default api;