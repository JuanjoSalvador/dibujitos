import styled from 'styled-components';

const Button = styled.button`
  display: ${props => props.center? 'block': 'inline-block'};
  text-align: center;
  background: var(--colorSecondary);
  margin: ${props => props.center? '10px auto' : '10px 0'};
  padding: 8px 12px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  pointer-events: ${props => props.disabled? 'none' : 'all'};
  opacity: ${props => props.disabled? 0.5 : 1};
  &:hover {
    border-color: currentColor;
  }
`;

export default Button;
