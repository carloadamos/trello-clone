import styled from "styled-components";

const StyledInputText = styled.input.attrs({
  type: "text",
  placeholder: "A text",
})`
  padding: 1rem 0 1rem 1rem;
  color: #c53030;
`;

const StyledSpan = styled.span`
  flex: 4;
  padding: 1rem;
`;

const StyledIcons = styled.div`
  flex: 1;
  display: none;
`;

const StyledTask = styled.div`
  align-items: center;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover ${StyledIcons} {
    display: flex;
  }
`;

export { StyledInputText, StyledSpan, StyledTask, StyledIcons };
