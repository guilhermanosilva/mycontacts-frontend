import ContactsService from '../../services/ContactsService';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato!'); //eslint-disable-line
    }
  }

  return (
    <div>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </div>
  );
}
