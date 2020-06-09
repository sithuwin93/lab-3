/** @jsx jsx */
import { jsx } from '@emotion/core'

function warnIfClash(ours,theirs) {
  const ourKeys = Object.keys(ours);
  const theirKeys = Object.keys(theirs);

  ourKeys.forEach((key) => {
    if (theirKeys.includes(key)) {
      // eslint-disable-next-line no-console
      console.warn(`
          FieldText:
          You are attempting to add prop "${key}" to the input field.
          It is clashing with one of our supplied props.
          Please try to control this prop through our public API
        `);
    }
  });
}

export default function Input({
  elemAfterInput,
  elemBeforeInput,
  isDisabled,
  isReadOnly,
  isRequired,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  onFocus,
  theme,
  innerRef,
  ...theirInputProps
}) {
  const ourInputProps = {
    onFocus,
    onBlur,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
  };

  if (process.env.NODE_ENV !== 'production') {
    warnIfClash(ourInputProps, theirInputProps);
  }

  const inputProps = {
    ...theirInputProps,
    ...ourInputProps,
  };

  const containerProps = {
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  };
  return (
    <div {...containerProps} css={theme.container}>
      {elemBeforeInput}
      <input
        {...inputProps}
        css={theme.input}
        ref={innerRef}
      />
      {elemAfterInput}
    </div>
  );
}
