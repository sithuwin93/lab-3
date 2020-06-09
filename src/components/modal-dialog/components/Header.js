import React from 'react';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import {
  Header,
  Title,
  TitleText,
  titleIconWrapperStyles,
} from '../styled/Content';

const TitleIcon = ({ appearance }) => {
  if (!appearance) return null;

  const Icon = appearance === 'danger' ? ErrorIcon : WarningIcon;

  return (
    <span css={titleIconWrapperStyles(appearance)}>
      <Icon label={`${appearance} icon`} />
    </span>
  );
};

export default class ModalHeader extends React.Component {
  static defaultProps = {
    isHeadingMultiline: true,
  };

  render() {
    const {
      appearance,
      component,
      heading,
      onClose,
      showKeyline,
      isHeadingMultiline,
    } = this.props;
    const warning = 'You can provide `component` OR `heading`, not both.';

    if (!component && !heading) return null;
    if (component && heading) {
      console.warn(warning); // eslint-disable-line no-console
      return null;
    }
    if (component) {
      return React.createElement(component, {
        appearance,
        onClose,
        showKeyline,
        isHeadingMultiline,
      });
    }

    return (
      <Header showKeyline={showKeyline}>
        <Title>
          <TitleIcon appearance={appearance} />
          <TitleText isHeadingMultiline={isHeadingMultiline}>
            {heading}
          </TitleText>
        </Title>
      </Header>
    );
  }
}
