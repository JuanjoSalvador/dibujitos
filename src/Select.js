import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  > label {
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
  }
  select {
    background: white;
    border: none;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 6px;
    width: 200px;
  }
`;

const Select = ({
  options = [],
  label = '',
  value = '',
  onChange = () => {}
}) => (
  <Container>
    <label htmlFor="source">{label}</label>
    <select value={value} onChange={onChange} name="source">
      {options.map(opt => {
        if (typeof opt === 'string') {
          opt = {label: opt, value: opt};
        }
        return (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )
      })}
    </select>
  </Container>
)

export default Select;
