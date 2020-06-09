// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { FlexRow, FlexCol } from 'src/components/globals';
import Card from 'src/components/card';
import { Transition, zIndex } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';
import TextField from 'src/components/textfield'

export const Row = styled(FlexRow)`
  padding: 8px 16px;
  align-items: center;
  width: 100%;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};

  div {
    margin-top: 2px;
    margin-right: 8px;
    color: inherit;
  }

  span {
    line-height: 1;
    color: inherit;
  }

  &:hover {
    background-color: ${() => themed({ light:theme.brand.alt , dark:theme.brandd.alt })};
    color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  }
`;

export const Col = styled(FlexCol)`
  width: 100%;

  a + a > div {
    border-top: 2px solid ${themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  }
`;

export const RowLabel = styled.span`
  font-weight: 600;
`;

export const SearchContainer = styled(Card)`
  border-bottom: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  background: ${() => themed({ light:theme.bg.wash , dark: theme.bgd.wash})};
  position: relative;
  z-index: ${zIndex.search};
  width: 100%;
  display: flex;
  padding: 8px 12px;
  transition: ${Transition.hover.off};
  // display: flex;
  // align-items: center;

  @media (max-width: ${MEDIA_BREAK}px) {
    border-radius: 0;
    pointer-events: all;
    margin-bottom: 0;
  }
`;

export const SearchInput = styled(TextField)`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  width: 100% !important;
  padding: 12px 16px;
  // color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  transition: ${Transition.hover.off};
  font-size: 16px;
  font-weight: 500;
  // border-radius: 100px;
  // background: ${() => themed({ light:theme.bg.default , dark: theme.bgd.default})};
  // border: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};

  // &:focus {
  //   border: 1px solid ${themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
  // }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Meta = styled(Column)`
  grid-area: meta;

  > button,
  > a > button {
    margin-top: 16px;
    margin-left: 32px;
    width: calc(100% - 32px);

    @media (max-width: ${MEDIA_BREAK}px) {
      margin-left: 0;
      width: 100%;
    }
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 0 16px;

    > div {
      margin-left: 0;
    }
  }
`;

export const MetaMemberships = styled.div`
  margin-left: 32px;

  @media (min-width: 1279px) {
    display: none;
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const ColumnHeading = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 1;
  font-weight: 500;
  padding: 8px 16px 12px;
  margin-top: 24px;
  border-bottom: 2px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
`;

export const FeedsContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
`;
