import { Button } from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

export default function NewContact() {
  return (
    <div>
      <PageHeader title="Novo Contato" />

      <Input placeholder="Nome" />
      <Select>
        <option value={123}>Instagram</option>
        <option value={123}>Twiiter</option>
        <option value={123}>Linkedin</option>
      </Select>
      <Button type="button" disabled>Salvar alterações</Button>
    </div>
  );
}
