import React, { useState } from 'react';
import { StyledButton } from '../../styles/GenericStyledComponents';
import { StyledBoardHeader } from './StyledBoardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PlainRow } from '../../styles/GenericStyledComponents';

const BoardHeader = () => {
  const [boardTitle, setBoardTitle] = useState('Board Title');
  return (
    <StyledBoardHeader>
      <PlainRow justifyContent={'space-between'}>
        <StyledButton width={'max-content'} onClick={() => setBoardTitle('New Title')}>
          {boardTitle}
        </StyledButton>
        <FontAwesomeIcon icon={faPlus} className="icon" />
      </PlainRow>
    </StyledBoardHeader>
  );
};

export default BoardHeader;
