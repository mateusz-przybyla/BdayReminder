import React, { useState } from "react";

import { currentTime } from "../utils/date&time";

const useTime = () => {
  const [time, setTime] = useState(currentTime);

  setInterval(updateTime, 1000);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  return {
    time,
  };
};

export default useTime;
