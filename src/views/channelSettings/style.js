// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
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

export const TokenInputWrapper = styled.div`
  position: relative;
  cursor: pointer;

  input {
    cursor: pointer;
  }

  &:after {
    content: 'Copy link';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    text-transform: uppercase;
    color: ${() => themed({ light:theme.text.reverse , dark:theme.textd.reverse })};
    background: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 700;
  }

  &:hover {
    &:after {
      background: ${() => themed({ light: theme.success.alt, dark: theme.successd.alt})};
    }
  }
`;

export const MessageIconContainer = styled.div`
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  }
`;

export const UserListItemContainer = styled.div`
  border-bottom: 1px solid ${themed({ light: theme.bg.wash, dark: theme.bgd.wash})};

  &:last-of-type {
    border-bottom: none;
  }
`;
