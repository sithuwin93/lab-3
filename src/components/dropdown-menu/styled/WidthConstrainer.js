// @flow

import styled from 'styled-components';

export default styled.div`
  ${({ shouldFitContainer }) =>
    shouldFitContainer ? 'zIndex: 6000;' : 'max-width: 300px;zIndex: 6000;'
  };
`;
