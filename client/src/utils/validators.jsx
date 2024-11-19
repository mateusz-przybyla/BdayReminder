import React from "react";

const emailValidator = (value) => {
  if (/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
    return false;
  return true;
};

const passwordValidator = (value) => {
  if (value.length < 3) return true;

  return false;
};

export { emailValidator, passwordValidator };
