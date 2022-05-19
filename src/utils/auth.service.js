import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://localhost:4000/";
//const baseURL = "https://5d224b0d-c612-4aa8-8eb1-381dcf01faee.mock.pstmn.io/";

//get token
const getToken = () => {
    return localStorage.getItem("token");
};

//decode token and get username and orgname
const decodeToken = () => {
    const token = getToken();
    if (token) {
        const decoded = jwt_decode(token);
        return {
            username: decoded.username,
            orgName: decoded.orgName,
        };
    }
};

const getUsername = () => {
    const decoded = decodeToken();
    return decoded.username;
};

const getOrgName = () => {
    const decoded = decodeToken();
    return decoded.orgName;
};



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
    getUsername,
    getOrgName,
    logout
};

export default authService;