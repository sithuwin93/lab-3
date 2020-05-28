// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { Gradient } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const Span = styled.span`
  display: inline-block;
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  background-color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  text-transform: uppercase;
  padding: 3px 4px;
  margin-right: 4px;
  font-size: 9px;
  font-weight: 800;
  border-radius: 4px;
  letter-spacing: 0.6px;
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
  align-items: center;
  align-self: center;
`;

export const ProBadge = styled(Span)`
  background-color: ${() => themed({ light: theme.special.default, dark: theme.speciald.default})};
  background-image: ${Gradient(themed({ light: theme.special.alt, dark: theme.speciald.alt}), themed({ light: theme.special.default, dark: theme.speciald.default}))};
`;

export const TeamBadge = styled(Span)`
  background-color: ${() => themed({ light: theme.success.default, dark: theme.successd.default})};
  background-image: ${Gradient(themed({ light: theme.success.alt, dark: theme.successd.alt}), themed({ light: theme.success.default, dark: theme.successd.default}))};
`;

export const BlockedBadge = styled(Span)`
  background-color: ${() => themed({ light: theme.warn.alt, dark: theme.warnd.alt})};
  background-image: ${Gradient(themed({ light: theme.warn.alt, dark: theme.warnd.alt}),themed({ light: theme.warn.default, dark: theme.warnd.default}) )};
`;

export const PendingBadge = styled(Span)`
  background-color: ${() => themed({ light: theme.special.alt, dark: theme.speciald.alt})};
  background-image: ${Gradient(themed({ light: theme.special.alt, dark: theme.speciald.alt}), themed({ light: theme.special.default, dark: theme.speciald.default}))};
`;
