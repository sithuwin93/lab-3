import React from 'react';
import { components } from 'react-select';

import { layers } from 'src/components/theme/constants';
import { N40A } from 'src/components/theme/colors';
import SearchIcon from '@atlaskit/icon/glyph/editor/search';



export const MenuDialog = ({
  maxWidth,
  minWidth,
  ...props
}) => (
  <div
    css={{
      backgroundColor: 'black',
      borderRadius: 4,
      boxShadow: `0 0 0 1px ${N40A}, 0 4px 11px ${N40A}`,
      maxWidth,
      minWidth,
      // zIndex: layers.modal(),
      zIndex: 999
    }}
    {...props}
  />
);


const DropdownIndicator = () => (
  <div css={{ marginRight: 2, textAlign: 'center', width: 32 }}>
    <SearchIcon label="open" />
  </div>
);

const Control = ({ innerRef, innerProps, ...props }) => (
  <div ref={innerRef} css={{ padding: '8px 8px 4px' }}>
    <components.Control
      {...(props)}
      innerProps={innerProps}
    />
  </div>
);
export const DummyControl = props => (
  <div
    css={{
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    }}
  >
    <components.Control {...props} />
  </div>
);

const Menu = ({ children, innerProps, ...props }) => (
  <div {...innerProps}>{children}</div>
);

export const defaultComponents = { Control, DropdownIndicator, Menu };
