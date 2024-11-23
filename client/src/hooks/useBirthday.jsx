import React, { useState, useEffect } from "react";

import {
  fetchItems,
  addItem,
  editItem,
  deleteItem,
} from "../services/birthday";

const useBirthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [message, setMessage] = useState("");
  const [messageAPI, setMessageAPI] = useState("");

  useEffect(() => {
    const fetchBirthdays = async () => {
      const response = await fetchItems();
      setBirthdays(response);
    };
    fetchBirthdays();
  }, []);

  useEffect(() => {
    if (message || messageAPI) {
      setTimeout(() => {
        setMessage("");
        setMessageAPI("");
      }, 3500);
    }
  }, [message, messageAPI]);

  const addBirthday = async (newBirthday) => {
    const response = await addItem(newBirthday);

    if (response.status === 503 || response.status === 422) {
      setMessageAPI(response.data.error);
    } else {
      setBirthdays((prevData) => [...prevData, response]);
      setMessage("Birthday created successfully!");
    }
  };

  const editBirthday = async (updatedBirthday) => {
    const response = await editItem(updatedBirthday, updatedBirthday.id);

    if (response.status === 503 || response.status === 422) {
      setMessageAPI(response.data.error);
    } else {
      const newData = birthdays.map((item) => {
        if (item.id === updatedBirthday.id) {
          return response;
        }
        return item;
      });

      setBirthdays(newData);
      setMessage("Birthday updated successfully!");
    }
  };

  const deleteBirthday = async (id) => {
    const response = await deleteItem(id);

    if (response.status === 503) {
      setMessageAPI(response.data.error);
    } else {
      setBirthdays(
        birthdays.filter((birthday) => {
          return birthday.id !== id;
        })
      );
      setMessage("Birthday deleted successfully!");
    }
  };

  return {
    birthdays,
    message,
    messageAPI,
    addBirthday,
    editBirthday,
    deleteBirthday,
  };
};

export default useBirthday;
