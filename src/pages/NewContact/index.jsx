import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch (e) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <div>
      <PageHeader title="Novo Contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
