import React from "react";
import axios from "axios";

const registerUser = async (credentials) => {
  try {
    return await axios.post("/api/register", credentials);
  } catch (error) {
    console.error(error.message);
    //dokonczyc
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
