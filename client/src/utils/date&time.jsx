import React from "react";

const currentDay = ("0" + new Date().getDate()).slice(-2);
const currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
const currentYear = new Date().getFullYear();
const currentTime = new Date().toLocaleTimeString();

export { currentDay, currentMonth, currentYear, currentTime };
