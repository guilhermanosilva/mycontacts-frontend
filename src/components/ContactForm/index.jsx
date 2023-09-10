import { useState } from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

import { ButtonContainer, Form } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setErrors((prev) => [...prev, { field: 'name', message: 'Nome é obrigatório.' }]);
    } else {
      setErrors((prev) => prev.filter((error) => error.field !== 'name'));
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      const emailAlreadyExists = errors.find((error) => error.field === 'email');

      if (emailAlreadyExists) return;

      setErrors((prev) => [...prev, { field: 'email', message: 'E-mail inválido.' }]);
    } else {
      setErrors((prev) => prev.filter((error) => error.field !== 'email'));
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input value={name} placeholder="Nome" onChange={handleNameChange} error={getErrorMessageByFieldName('name')} />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input value={email} placeholder="Email" onChange={handleEmailChange} error={getErrorMessageByFieldName('email')} />
      </FormGroup>

      <FormGroup>
        <Input value={phone} placeholder="Telefone" onChange={(e) => setPhone(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twiiter</option>
          <option value="likedin">Linkedin</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
