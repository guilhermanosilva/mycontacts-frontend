import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const emailAlreadyExists = errors.find((error) => error.field === field);

    if (emailAlreadyExists) return;

    setErrors((prev) => [...prev, { field, message }]);
  }

  function removeError(fieldName) {
    setErrors((prev) => prev.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
}
