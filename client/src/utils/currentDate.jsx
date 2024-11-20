import React from "react";

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const currentTime = new Date().toLocaleTimeString();

export { currentDay, currentMonth, currentYear, currentTime };
