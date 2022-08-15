import axios from "axios";
import { API_URL } from "../helpers/globalVars";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = (username, password) => {
    const formData = new FormData()
    formData.append('username', username);
    formData.append('password', password);
    return axios
    .post(API_URL + 'authentication/login/authentication',formData)
    .then((response) => {
        if (response.data.data) {
            localStorage.setItem("login_token", JSON.stringify(response.data.data));
        }
        return response;
    });
};

const logout = () => {
    localStorage.removeItem("login_token");
    // return axios.post(API_URL + "login/logout").then((response) => {
    //     return response.data;
    // });
};

const getCurrentUser = () => {
    // console.log('localstorage->login_token',JSON.parse(localStorage.getItem("login_token")));
    const login_token = JSON.parse(localStorage.getItem("login_token"));
    if(login_token){
        return login_token;
    }else{
        return false;
    }
};

const LoginService = {
  login,
  logout,
  getCurrentUser,
}

export default LoginService;
