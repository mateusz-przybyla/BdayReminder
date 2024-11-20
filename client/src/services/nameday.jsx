import React from "react";
import axios from "axios";

const baseURL = "https://nameday.abalin.net";

const getTodayNameday = async (countryCode, timezone) => {
  try {
    return await axios.get(`${baseURL}/api/V1/today`, {
      params: {
        country: countryCode,
        timezone: timezone,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { getTodayNameday };
