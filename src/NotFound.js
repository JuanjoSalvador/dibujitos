import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 30px;
  h2 {
    font-weight: 400;
  }
  small {
    color: red;
  }
  button {
    border: none;
    background: var(--colorSecondary);
    font-size: 16px;
    padding: 12px 16px;
    font-weight: 500;
    opacity: 0.8;
    border-radius: 6px;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;

const NotFound = () => (
  <Container>
    <h2>Aqui no hay nada ¯\_(ツ)_/¯</h2>
    <button onClick={() => window.history.back()}>
      Volver atrás
    </button>
  </Container>
)
export default NotFound;