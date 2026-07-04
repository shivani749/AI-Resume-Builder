import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/resumes",
});

export const createResume = (data) => API.post("/", data);
export const getResumes = () => API.get("/");

export const updateResume = (id, data) => {
  return API.put(`/${id}`, data);
};

export const deleteResume = (id) => {
    return API.delete(`/${id}`);
};

export default API;