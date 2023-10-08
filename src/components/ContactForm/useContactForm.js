import {
  useEffect, useState, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import CategoriesService from '../../services/CategoriesService';

export default function useContactForm({ onSubmit, ref }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    getErrorMessageByFieldName, removeError, setError, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone(formatPhone(''));
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      setLoadingCategories(true);
      try {
        const categoriesList = await CategoriesService.listCategories(controller.signal);
        setCategories(categoriesList);
      } catch { } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setLoadingCategories]);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) setError({ field: 'name', message: 'Nome é obrigatório.' });
    else removeError('name');
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    const isEmailInvalid = e.target.value && !isEmailValid(e.target.value);

    if (isEmailInvalid) setError({ field: 'email', message: 'E-mail inválido.' });
    else { removeError('email'); }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
