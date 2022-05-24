import axios from "axios";

//export const baseURL = "http://localhost:4000/";
export const baseURL2 = "http://127.0.0.1:5000/";
export const baseURL = "https://5d224b0d-c612-4aa8-8eb1-381dcf01faee.mock.pstmn.io/";

const getToken = () => {
  return localStorage.getItem("token");
};

const getUserId = () => {
  return localStorage.getItem("token");
};

// const headers = () => ({
//   'access-token': getToken(),
//   'user-id': getUserId(),
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   'x-channel': 'PWA',
// });

export const Post = async (url, data) => {
  const postResponse = await axios.post(`${baseURL}${url}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return postResponse;
};

export const Get = async (url) => {
  const getResponse = await axios.get(`${baseURL}${url}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,

      Accept: "application/json",
    },
  });

  return getResponse;
};

export const GetPrediction = async (url) => {
  const getResponse = await axios.get(`${baseURL2}${url}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  return getResponse;
};

export const Put = async (url, data) => {
  return await axios.put(`${baseURL}${url}`, data, {
    headers: {
      "x-access-token": `${localStorage.getItem("token")}`,
    },
  });
};

export const Delete = async (url, data) => {
  const deleteResponse = await axios({
    method: "DELETE",
    url: `${baseURL}${url}`,
    data: {
      ...data,
    },
    headers: {
      "x-access-token": `${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-channel": "PWA",
    },
  });

  return deleteResponse;
};
