import React from 'react';
import { StyledHeader } from './StyledHeader';
import GridLoader from 'react-spinners/GridLoader';

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { loading } = props;
  return (
    <StyledHeader>
      <span>
        {loading && <GridLoader size={5} margin={2} loading={loading} color={'#fff'}></GridLoader>}
      </span>
      <span>Almost Trello</span>
    </StyledHeader>
  );
};

export default Header;
