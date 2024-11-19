import React from "react";
import axios from "axios";
/*
export async function getList() {
  //return fetch("http://localhost:3333/list").then((data) => data.json());

  const response = await axios.get("http://localhost:8080/api/data");
  return response.data.birthdays;
}

export async function setItem(item) {
  const response = await axios.post("http://localhost:8080/api/data", item);
  console.log(response.data);
}
*/

const registerUser = async (credentials) => {
  try {
    return await axios.post("/api/register", credentials);
  } catch (error) {
    console.error(error.message);
  }
};

const loginUser = async (credentials) => {
  try {
    return await axios.post("/api/login", credentials, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const getUserInfo = async () => {
  try {
    const response = await axios.get("/api/sessions", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const logoutUser = async () => {
  try {
    await axios.delete("/api/sessions", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { loginUser, registerUser, logoutUser, getUserInfo };
