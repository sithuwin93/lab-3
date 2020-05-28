// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import {
  FlexRow,
  FlexCol,
  Gradient,
  Shadow,
  hexa,
  zIndex,
} from 'src/components/globals';
import { Button } from 'src/components/button';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';

export const Title = styled.h1`
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  width: 100%;
  font-weight: 800;
  font-size: 24px;
  line-height: 1.25;
  margin-bottom: 8px;
  padding: 0;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.2px;
`;

export const LargeTitle = styled(Title)`
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 0.3px;
  margin-bottom: 16px;
`;

export const SmallTitle = styled(Title)`
  font-size: 18px;
`;

export const MiniTitle = styled(Title)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 8px;
  }
`;

export const Subtitle = styled.h2`
  width: 100%;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 16px;
  padding: 0 32px;
  text-align: center;

  b {
    font-weight: 700;
  }

  a {
    color: ${() => themed({ light:theme.brand.default , dark:theme.brandd.default })};
  }

  li {
    margin-top: 8px;
    list-style-type: none;
  }
`;

export const LargeSubtitle = styled(Subtitle)`
  font-size: 20px;
`;

export const MiniSubtitle = styled(Subtitle)`
  font-weight: 600;
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const SmallSubtitle = styled(Subtitle)`
  font-size: 15px;
`;

export const Cost = styled(Subtitle)`
  margin-top: 8px;
  font-weight: bold;
`;

export const NullCol = styled(FlexCol)`
  background-image: ${props =>
    props.bg ? `url('/img/fills/${props.bg}.svg')` : 'none'};
  background-color: transparent;
  background-size: 110% auto;
  background-repeat: ${props => (props.repeat ? 'repeat-y' : 'no-repeat')};
  background-position: ${props =>
    props.repeat ? 'center top' : 'center center'};
  width: 100%;
  height: auto;
  min-height: 160px;
  flex: 0 0 auto;
  padding: ${props => (props.noPadding ? '0' : '2rem')};
  justify-content: center;
  align-items: center;
  position: relative;
  align-self: center;
`;

export const NullRow = styled(FlexRow)`
  background-image: url('/img/fills/${props =>
    props.bg ? `${props.bg}` : 'locked'}.svg');
  background-color: transparent;
  background-size: 110% auto;
  background-repeat: no-repeat;
  background-attachment: center;
  width: 100%;
  height: auto;
  padding: 1rem 15%;
`;

export const Profile = styled.div`
  position: relative;
  padding: 16px 0;

  img {
    border-radius: 48px;
    width: 48px;
    height: 48px;
  }

  span {
    background-color: ${() => themed({ light: theme.success.default, dark:theme.successd.default })};
    background-image: ${({ theme }) =>
    themed({ light: Gradient(theme.success.alt, theme.success.default), dark:Gradient(theme.successd.alt, theme.successd.default) })};
    position: absolute;
    left: 75%;
    top: 48px;
    color: ${() => themed({ light: theme.text.reverse, dark:theme.textd.reverse })};
    font-size: 10px;
    font-weight: 800;
    padding: 2px 4px;
    border-radius: 8px;
    line-height: 1.5;
    border: 2px solid #fff;
    z-index: ${zIndex.avatar + 1};
  }
`;

export const UpsellIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  margin-top: 32px;
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
`;

export const SignupButton = styled(Button)`
  font-size: 18px;
  font-weight: 700;
  color: ${() => themed({ light:theme.text.reverse , dark: theme.textd.reverse})};
  padding: 16px 88px;
  max-width: 100%;
  box-shadow: ${props =>
    `${Shadow.high} ${themed({ light: hexa(props.theme.bg.reverse, 0.15), dark: hexa(props.theme.bgd.reverse, 0.15)})}`};
  margin-top: 8px;
`;

export const SignupFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  font-size: 14px;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  font-weight: 500;
  border-top: 2px solid ${themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
  margin-top: 40px;
  width: 100%;
`;

export const SigninLink = styled.span`
  color: ${() => themed({ light: theme.brand.default, dark:theme.brandd.default })};
  margin-left: 6px;
  cursor: pointer;
`;

export const FullscreenContent = styled.div`
  width: 100%;
  max-width: ${MEDIA_BREAK}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px 16px;
  flex: 1 0 auto;
  @media (min-width: ${MEDIA_BREAK}px) {
    padding-top: 40px;
  }
`;

export const CodeOfConduct = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  border-radius: 8px;
  margin-top: 64px;
  margin-left: 32px;
  margin-right: 32px;
  text-align: center;
  position: relative;
  z-index: ${zIndex.card + 1};

  a {
    color: ${() => themed({ light: theme.brand.default, dark: theme.brandd.default})};
    font-weight: 600;
  }
`;
