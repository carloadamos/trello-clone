import styled from "styled-components";

const StyledAddItem = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StyledIcon = styled.div`
  display: none;
`;

const StyledCardList = styled.div`
  background-color: #feb2b2;
  border-radius: 4px;
  color: black;
  margin: 0 0.75rem;
  min-width: 15rem;
  padding: 0.5rem;

  &:hover ${StyledIcon} {
    display: block;
  }
`;

const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { StyledAddItem, StyledCardList, StyledTitleBar, StyledIcon };
