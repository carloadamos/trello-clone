import styled from 'styled-components';

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
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover ${StyledIcons} {
    display: flex;
  }
`;

export { StyledSpan, StyledTask, StyledIcons };
