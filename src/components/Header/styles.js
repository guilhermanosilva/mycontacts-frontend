import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 74px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputSearchContainer = styled.div`
  margin-top: 48px;
  width: 100%;

  input {
    width: 100%;
    height: 50px;
    padding: 0 16px;
    border-radius: 25px;
    border: none;
    outline: none;
    background-color: #FFFFFF;
    box-shadow: 8px 4px 18px rgba(0,0,0, 0.04);

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
