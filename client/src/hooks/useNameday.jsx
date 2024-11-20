import React, { useState, useEffect } from "react";

import { getTodayNameday } from "../services/nameday";

const useNameday = () => {
  const [todayNameday, setTodayNameday] = useState("Namedays not fetched.");

  useEffect(() => {
    async function fetchData() {
      const countryCode = "pl";
      const timezone = "";

      const response = await getTodayNameday(countryCode, timezone);
      const namedays = response.data.nameday.pl;

      namedays && setTodayNameday(namedays);
    }
    fetchData();
  }, []);

  return {
    todayNameday,
  };
};

export default useNameday;
