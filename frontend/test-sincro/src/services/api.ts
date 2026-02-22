import axios from "axios";

// instância do Axios apontando para o backend
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});