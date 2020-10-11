import styled from 'styled-components';

const StyledInputText = styled.input.attrs({
  type: 'text'
})`
  border-radius: 5px;
  border: 1px solid #fc8181;
  padding: 0.5rem;
  width: 100%;

  &:focus {
    border-radius: 5px;
    border: 1px solid #fc8181;
    outline: none;
    padding: 0.5rem;
  }
`;

export { StyledInputText };
