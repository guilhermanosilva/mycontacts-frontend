import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <div>
      <PageHeader title="Jose Silva" />

      <ContactForm buttonLabel="Salvar alterações" />
    </div>
  );
}
