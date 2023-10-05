import PropTypes from 'prop-types';

import { Container } from './styles';

export default function IndexSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquisar pelo none..."
        onChange={onChange}
      />
    </Container>
  );
}

IndexSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
