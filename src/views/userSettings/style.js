// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { FlexRow, FlexCol } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';
import { subtleHeading } from 'src/components/theme/colors';
import { fontSize, gridSize } from 'src/components/theme/constants';
import { headingSizes } from 'src/components/theme/typography';

export const LabelWrapper = styled.div`
  margin-top: 12px;
`

export const Label = styled.label`
  font-size: ${headingSizes.h400.size / fontSize()}em;
  font-style: inherit;
  line-height: ${headingSizes.h200.lineHeight /headingSizes.h200.size};
  color: ${subtleHeading()};
  font-weight: 600px;
  margin-top: ${gridSize() * 2}px;
`

export const EmailListItem = styled.div`
  padding: 8px 0 16px;
  border-bottom: 2px solid ${themed({ light: theme.bg.wash, dark:theme.bgd.wash })};

  &:last-of-type {
    border-bottom: none;
  }

  input {
    margin-right: 8px;
  }
`;

export const CheckboxContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;

  @media (max-width: ${MEDIA_BREAK}px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  display: inline-block;
  flex-direction: column;
  align-self: stretch;
  flex: none;
  max-width: 100%;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  padding: 8px 0 16px;
  line-height: 1.4;

  a {
    color: ${() => themed({ light: theme.brand.default, dark: theme.brandd.default})};
  }
`;

export const TertiaryActionContainer = styled(FlexRow)`
  justify-content: flex-start;
  flex-grow: 1;
`;

export const Actions = styled(FlexRow)`
  margin-top: 24px;
  justify-content: flex-start;
  flex-direction: row-reverse;
  border-top: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  padding-top: 16px;

  button + button {
    margin-left: 8px;
  }
`;

export const PhotoPreview = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  background-image: url('${props => props.src}')
`;

export const GeneralNotice = styled.span`
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  border-radius: 4px;
  margin-top: 24px;
  line-height: 1.4;
  display: inline-block;
`;

export const ImageInputWrapper = styled(FlexCol)`
  position: relative;
  flex: 0 0 auto;
  margin-top: 8px;
  margin-bottom: 24px;

  > label:nth-of-type(2) {
    position: absolute;
    bottom: -24px;
    left: 16px;
  }
`;

export const Location = styled(FlexRow)`
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  font-size: 14px;
  margin-bottom: 8px;

  > div {
    color: ${() => themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }

  > span {
    padding: 0 4px;
    color: ${() => themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }

  > a:hover {
    color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
    text-decoration: underline;
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const GithubSignin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  a {
    margin-top: 8px;
  }
`;

export const LogoutWrapper = styled.div`
  display: block;

  button {
    width: 100%;
  }
`;
