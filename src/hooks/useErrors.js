import { useState, useCallback } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const emailAlreadyExists = errors.find((error) => error.field === field);

    if (emailAlreadyExists) return;

    setErrors((prev) => [...prev, { field, message }]);
  }, [errors]);

  const removeError = useCallback((fieldName) => {
    setErrors((prev) => prev.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
}
