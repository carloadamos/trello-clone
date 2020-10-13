import React, { useState } from 'react';
import { StyledButton } from '../../styles/GenericStyledComponents';
import { StyledBoardHeader } from './StyledBoardHeader';

const BoardHeader = () => {
  const [boardTitle, setBoardTitle] = useState('Board Title');
  return (
    <StyledBoardHeader>
      <StyledButton width={'max-content'} onClick={() => setBoardTitle('New Title')}>
        {boardTitle}
      </StyledButton>
    </StyledBoardHeader>
  );
};

export default BoardHeader;
