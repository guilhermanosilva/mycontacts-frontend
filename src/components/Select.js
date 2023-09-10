import styled from 'styled-components';

export default styled.select`
  width: 100%;
  padding: 0 16px;
  height: 52px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  font-size: 16px;
  border: 2px solid #fff;
  outline: none;
  appearance: none;
  transition: border-color 0.2s ease-in;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }
`;
