import React from 'react';

import Select from './Select';
import { CheckboxOption } from './components/input-options';

const CheckboxSelect = ({ components, ...props }) => {
  const temp = {
    ...components,
    Option: CheckboxOption,
  };

  return (
    <Select
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isMulti
      components={temp}
      {...props}
    />
  );
};

export default CheckboxSelect;
