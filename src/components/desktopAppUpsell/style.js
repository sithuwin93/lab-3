// @flow
import styled from 'styled-components';
import { theme } from 'shared/theme';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  padding: 12px 8px;
  background: ${() => themed({ light:theme.bg.wash , dark: theme.bgd.wash})};
`;

export const Card = styled.div`
  padding: 16px;
  background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  position: relative;
`;

export const AppIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 4px;
`;

export const CloseIconContainer = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  margin-bottom: 16px;
`;
