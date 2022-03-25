import axios from "axios";

const API_URL =  "http://localhost:8080/api/loc";

const getAll = () => {
  return axios.get(API_URL + "/destino");
};

const getById = (id) => {
  return axios.get(API_URL + "/destino/" + id);
};

const create = (data) => {
  return axios.post(API_URL + "/destino", data);
};

const update = (id, data) => {
  return axios.put(API_URL + "/destino/" + id, data);
};

const remove = (id) => {
  return axios.delete(API_URL + "/destino/" + id);
};

const DestinoService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default DestinoService;
