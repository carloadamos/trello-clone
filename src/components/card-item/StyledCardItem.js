import styled from "styled-components";

const StyledInputText = styled.input.attrs({
  type: "text",
  placeholder: "A text",
})`
  padding: 1rem 0 1rem 1rem;
  color: #c53030;
`;

const StyledSpan = styled.span`
  padding: 1rem 0 1rem 1rem;
`;

const StyledTask = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledIcons = styled.div`
  display: flex;
`;

export { StyledInputText, StyledSpan, StyledTask, StyledIcons };
