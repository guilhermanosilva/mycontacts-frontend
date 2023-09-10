import { useState } from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

import { ButtonContainer, Form } from './styles';
import useErrors from '../../hooks/useErrors';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const { getErrorMessageByFieldName, removeError, setError } = useErrors();

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

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input value={name} placeholder="Nome" onChange={handleNameChange} error={getErrorMessageByFieldName('name')} />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input value={email} type="email" placeholder="Email" onChange={handleEmailChange} error={getErrorMessageByFieldName('email')} />
      </FormGroup>

      <FormGroup>
        <Input value={phone} type="tel" placeholder="Telefone" maxLength={15} onChange={handlePhoneChange} />
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
