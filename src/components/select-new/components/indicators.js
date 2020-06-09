import React from 'react';
import { components } from 'react-select';
import Spinner from 'src/components/spinner';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';

export const ClearIndicator = props => (
  <components.ClearIndicator {...props}>
    <SelectClearIcon size="small" primaryColor="inherit" label="clear" />
  </components.ClearIndicator>
);

export const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <DownIcon label="open" />
  </components.DropdownIndicator>
);

export const LoadingIndicator = props => (
  <div css={props.getStyles('loadingIndicator', props)} {...props.innerProps}>
    <Spinner size="small" />
  </div>
);
