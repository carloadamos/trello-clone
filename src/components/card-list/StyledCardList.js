import styled from "styled-components";

const StyledAddItem = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StyledCardList = styled.div`
  background-color: #feb2b2;
  border-radius: 4px;
  color: black;
  margin: 0 0.75rem;
  min-width: 15rem;
  padding: 0.5rem;
`;

const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { StyledAddItem, StyledCardList, StyledTitleBar };
