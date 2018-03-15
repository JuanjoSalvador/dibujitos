import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  height: 36px;
  width: 36px;
  margin-left: 20px;
  border-radius: 50%;
`;

const Gravatar = ({hash, ...props}) => (
  <Img src={`https://www.gravatar.com/avatar/${hash}`} {...props} />
)

export default Gravatar;