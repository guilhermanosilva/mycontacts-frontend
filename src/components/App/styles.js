import styled from 'styled-components';

export const Container = styled.div`
  width: min(500px, 100%);
  margin: 0 auto;

  @media (max-width: 500px){
    padding: 16px
  }
`;
