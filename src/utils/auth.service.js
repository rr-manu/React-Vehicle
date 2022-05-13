import axios from "axios";

const baseURL = "http://localhost:4000/";

//api for register
const register = (username,orgName) => {
    return axios
        .post(`${baseURL}users`, {
        username,
        orgName,
        })
        .then((response) => {
        console.log(response);
        if(response.data.token){
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
        });
};


//api for login
const login = (username,orgName) => {
    return axios
        .post(`${baseURL}users/login`, {
            username,
            orgName,
        })
        .then((response) => {
        console.log(response);
        if(response.data.message.token){
            localStorage.setItem("token", response.data.message.token);
        }
        return response.data;
        });
}

//logout
const logout = () => {
    localStorage.removeItem("token");
};

const authService = {
    register,
    login,
    logout
};

export default authService;