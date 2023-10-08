import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export function useEditContact() {
  const [isLoading, setLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        safeAsyncAction(() => {
          history.push('/');
          toast({ type: 'danger', text: 'Contato não encontrado!' });
        });
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch (e) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return {
    isLoading, contactName, contactFormRef, handleSubmit,
  };
}
