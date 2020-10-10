import styled from "styled-components";

const StyledAddItem = styled.div`
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const StyledIcon = styled.div`
  display: none;
`;

const StyledInlineIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCardList = styled.div`
  background-color: #feb2b2;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: black;
  margin: 0 0.75rem;
  min-width: 18rem;
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

export {
  StyledAddItem,
  StyledCardList,
  StyledTitleBar,
  StyledIcon,
  StyledInlineIcon,
};
