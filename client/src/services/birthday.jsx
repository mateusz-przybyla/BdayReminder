import React from "react";
import axios from "axios";

const fetchItems = async () => {
  try {
    const response = await axios.get("/api/data");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const addItem = async (newItem) => {
  try {
    const response = await axios.post("/api/data", newItem);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.response;
  }
};

const editItem = async (updatedItem, id) => {
  try {
    const response = await axios.put(`/api/data/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.response;
  }
};

const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`/api/data/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.response;
  }
};

export { fetchItems, addItem, editItem, deleteItem };
