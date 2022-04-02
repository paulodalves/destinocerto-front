import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const registerr = (username, nome, sobrenome, telefone, cpf, email, password) => {
  return axios.post(API_URL + "/signup", {
    username,
    nome,
    sobrenome,
    telefone,
    cpf,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerr,
  login,
  logout,
};

export default authService;