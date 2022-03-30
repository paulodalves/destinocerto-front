import axios from "axios";

const API_URL =  "http://localhost:8080/api/marcar";

const getAll = () => {
  return axios.get(API_URL + "/user/viagens");
};

const getAllByUserId = (id) => {
  return axios.get(API_URL + "/user/" + id + "/viagens");
};

const create = (userId, id, data) => {
  return axios.post(API_URL + "/user/" + userId + "/viagens/" + id, data);
};

const update = (id, data) => {
  return axios.put(API_URL + "/destino/" + id, data);
};

const remove = (id) => {
  return axios.delete(API_URL + "/destino/" + id);
};

const ViagemService = {
  getAll,
  getAllByUserId,
  create,
  update,
  remove
};

export default ViagemService;
