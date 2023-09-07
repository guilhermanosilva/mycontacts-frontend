import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  transition: background 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[200]};
    cursor: default;
  }
`;
