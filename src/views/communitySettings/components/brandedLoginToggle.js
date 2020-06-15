// @flow
import * as React from 'react';
import { Checkbox } from 'src/components/formElements';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import enableBrandedLoginMutation from 'shared/graphql/mutations/community/enableBrandedLogin';
import disableBrandedLoginMutation from 'shared/graphql/mutations/community/disableBrandedLogin';
import { addToastWithTimeout } from 'src/actions/toasts';
import type { Dispatch } from 'redux';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  id: string,
  settings: {
    isEnabled: boolean,
  },
  enableBrandedLogin: Function,
  disableBrandedLogin: Function,
  dispatch: Dispatch<Object>,
  t: i18n.TFunction
};

class BrandedLoginToggle extends React.Component<Props> {
  init = () => {
    return this.props.settings.isEnabled ? this.disable() : this.enable();
  };

  disable = () => {
    return this.props
      .disableBrandedLogin({ id: this.props.id })
      .then(() => {
        return this.props.dispatch(
          addToastWithTimeout('neutral', this.props.t('communitySettings:BrandedLoginDisabled'))
        );
      })
      .catch(err => {
        return this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  enable = () => {
    return this.props
      .enableBrandedLogin({ id: this.props.id })
      .then(() => {
        return this.props.dispatch(
          addToastWithTimeout('success', t('communitySettings:BrandedLoginEnabled'))
        );
      })
      .catch(err => {
        return this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  render() {
    const { isEnabled } = this.props.settings;
    const { t } = this.props;
    return (
      <Checkbox checked={isEnabled} onChange={this.init}>
        {t('communitySettings:EnableCustomBrandedLogin')}
      </Checkbox>
    );
  }
}

export default compose(
  connect(),
  enableBrandedLoginMutation,
  disableBrandedLoginMutation
)(withTranslation(['common','communitySettings'])(BrandedLoginToggle));
