// @flow
import styled from 'styled-components';
import { theme } from 'shared/theme';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  padding: 16px;

  a,
  button {
    width: 100%;
  }
`;

export const AppIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 4px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  margin-bottom: 16px;
`;
