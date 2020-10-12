import styled from 'styled-components';

const StyledBoard = styled.div`
  display: flex;
  padding: 1.5rem;
`;

const StyledBoardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledAddButton = styled.div`
  background-color: #fc8181; /* 400 */
  border: none;
  color: #fff6f5; /* 100 */
  display: flex;
  align-items: center;
  padding: 0 1rem 0 0.5rem;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #f56565; /* 500 */
  }
`;

const StyledMinContent = styled.div`
  height: min-content;
`;

export { StyledBoard, StyledBoardList, StyledAddButton, StyledMinContent };
