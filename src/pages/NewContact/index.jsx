import useNewContact from './useNewContact';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

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
