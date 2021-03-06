import styled from 'styled-components';
import { themed } from 'src/components/theme';
import { borderRadius, gridSize, layers } from 'src/components/theme/constants';
import { N0, DN50, N900, DN600 } from 'src/components/theme/colors';
import { multiply } from 'src/components/theme/math';
import { e200 } from 'src/components/theme/elevation';

const backgroundColor = themed({ light: N0, dark: DN50 });
const textColor = themed({ light: N900, dark: DN600 });

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: content-box; /* do not set this to border-box or it will break the overflow handling */
  color: ${textColor};
  max-height: ${multiply(gridSize, 56)}px;
  max-width: ${multiply(gridSize, 56)}px;
  padding: ${multiply(gridSize, 2)}px ${multiply(gridSize, 3)}px;
  z-index: ${layers.dialog};

  ${e200};

  &:focus {
    outline: none;
  }
`;
