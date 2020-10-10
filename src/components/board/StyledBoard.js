import styled from 'styled-components';

const StyledBoard = styled.div`
    display: flex;
    padding: 1.5rem;
`;

const StyledBoardList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledTitleInput = styled.input.attrs({
    type: 'text'
})`
    border-radius: 5px;
    border: 1px solid #fc8181;
    padding: 0.5rem;

    &:focus {
        border-radius: 5px;
        border: 1px solid #fc8181;
        outline: none;
        padding: 0.5rem;
    }
`;

const StyledAddButton = styled.div`
    background-color: #fc8181; /* 400 */
    border: none;
    color: #fff6f5; /* 100 */
    margin-left: 0.75rem;
    padding: 0.5rem 1rem;
    text-align: center;

    &:hover {
        cursor: pointer;
        background-color: #f56565; /* 500 */
    }
`;

const StyledMinContent = styled.div`
    height: min-content;
`;

export { StyledBoard, StyledBoardList, StyledTitleInput, StyledAddButton, StyledMinContent };
