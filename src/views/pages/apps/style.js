// @flow
import styled from 'styled-components';
import { Wrapper } from '../style';
import { themed } from 'src/components/theme';

export const PageWrapper = styled(Wrapper)`
  min-height: 100vh;
`;

export const Intro = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'copy';
  grid-gap: 32px;
  margin: 10vh 5vw;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: 1440px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'copy illo';
    margin: 10vh 10vw;
    align-items: left;
    text-align: left;
  }
`;

export const TextContent = styled.div`
  grid-area: copy;
  justify-self: center;
  z-index: 1;
  text-shadow: 0 0 4px ${props => themed({ light: props.theme.bg.default, dark: props.theme.bgd.default})};
  max-width: 560px;
  text-align: center;

  @media (max-width: 800px) {
    padding-top: 0;
    margin-left: 0;
    margin-bottom: 0;

    > h1 {
      margin-top: 0;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 64px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;

    a {
      margin: 0 0 16px;
      display: flex;
      flex: 1;
      width: 100%;
    }

    button {
      display: flex;
      flex: 1;
      width: 100%;
    }
  }
`;
