import React from "react";
import axios from "axios";

const fetchItems = async () => {
  try {
    const response = await axios.get("/api/data");

    return response.data.list;
  } catch (error) {
    console.error(error.message);
  }
};

const setItem = async (newItem) => {
  try {
    const response = await axios.post("/api/data", newItem);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const editItem = async (updatedItem, id) => {
  try {
    const response = await axios.patch(`/api/data/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`/api/data/${id}`);
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchItems, setItem, editItem, deleteItem };
