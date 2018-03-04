import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
  .material-icons {
    color: white;
  }
`;

const Star = () => (
  <svg height="25" width="23">
    <polygon fill="#d8d8d8" 
      points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" 
      style={{fillRule: 'nonzero'}}/>
  </svg>
)

const Stars = (props) => {
  return (
    <Container>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />      
    </Container>
  );
}

export default Stars;
