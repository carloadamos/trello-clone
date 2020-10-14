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

const StyledButton = styled.div`
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#fc8181')};
  border: none;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  color: ${(props) => (props.color ? props.color : '#fff')};
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: ${(props) => (props.margin ? props.margin : 0)};
  text-align: center;
  width: ${(props) => (props.width ? props.width : 'min-content')};

  &:hover {
    cursor: pointer;
    background-color: #f56565; /* 500 */
  }
`;

const StyledCard = styled.div`
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#F7FAFC')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;

const PlainRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  gap: ${(props) => (props.gap ? props.gap : 0)};
`;

export { StyledInputText, StyledButton, StyledCard, PlainRow };
