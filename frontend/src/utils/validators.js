// utils/validators.js

export const isRequired = (value) => {
  return value && value.trim() !== "";
};

export const isPhone = (value) => {
  return /^[0-9]{10}$/.test(value);
};

export const isNumeric = (value) => {
  return /^[0-9]+$/.test(value);
};

export const minLength = (value, length) => {
  return value && value.length >= length;
};

export const validateEmail = (value) => {
  return /\S+@\S+\.\S+/.test(value);
};
