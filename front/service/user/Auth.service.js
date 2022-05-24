import axios from "axios";
import { config } from "../../src/config/config";

const API_URL = config+"api/user/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      },)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("Authorization", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("Authorization");
  }

  register(username, password, authen) {
    return axios.post(API_URL + "signup", {
      username,
      password,
      authen
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('Authorization'));
  }
}

export default new AuthService();
