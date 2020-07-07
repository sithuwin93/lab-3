import { gridSize } from 'src/components/theme/constants';
import { colors } from 'src/components/theme';

const BORDER_WIDTH = 2;
const ICON_PADDING = 2;
const paddingExcludingBorder = gridSize() - BORDER_WIDTH;

export default function baseStyles(
  validationState,
  isCompact,
  theme,
) {
  let textColor;
  if(theme == 'light') {
    textColor = colors.N900

  }else {
    textColor = colors.DN600

  }
  return {
    control: (css, { isFocused, isDisabled }) => {
      let borderColor,backgroundColor,hoverBackgroundColor,borderColorHover
      if(theme == 'light') {
        borderColor = isFocused ? colors.B100 : colors.N20;
        backgroundColor = isFocused ? colors.N0 : colors.N20;
        hoverBackgroundColor = isFocused ? colors.N0 : colors.N30;
        borderColorHover = isFocused ? colors.B100 : colors.N30;
        if (isDisabled) {
          backgroundColor = colors.N20;
        }  
      } else {
        borderColor = isFocused ? colors.B75 : colors.DN40;
        backgroundColor = isFocused ? colors.DN10 : colors.DN10;
        hoverBackgroundColor = isFocused ? colors.N900 : colors.DN30;
        borderColorHover = isFocused ? colors.B75 : colors.DN40;
        if (isDisabled) {
          backgroundColor = colors.DN90;
        }  
      }


      if (validationState === 'error') borderColor = colors.R400;
      if (validationState === 'success') borderColor = colors.G400;


      if (validationState === 'error') borderColorHover = colors.R400;
      if (validationState === 'success') borderColorHover = colors.G400;

      const transitionDuration = '200ms';
      return {
        ...css,
        backgroundColor,
        borderColor,
        borderStyle: 'solid',
        borderRadius: '10px',
        borderWidth: '2px',
        // boxShadow: 'none',
        // boxShadow: 'inset 3px 3px 5px #cbcbcb, inset -3px -3px 5px #ffffff',
        boxShadow: '2px 2px 3px rgba(55, 84, 170, .15), inset 0px 0px 4px rgba(255, 255, 255, 0), inset 7px 7px 15px rgba(55, 84, 170, .15), inset -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, .2) !important',  

        minHeight: isCompact ? gridSize() * 4 : gridSize() * 5,
        padding: 0,
        transition: `background-color ${transitionDuration} ease-in-out,
        border-color ${transitionDuration} ease-in-out`,
        msOverflowStyle: '-ms-autohiding-scrollbar',
        '::-webkit-scrollbar': {
          height: gridSize(),
          width: gridSize(),
        },
        '::-webkit-scrollbar-corner': {
          display: 'none',
        },
        ':hover': {
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          cursor: 'pointer',
          backgroundColor: hoverBackgroundColor,
          borderColor: borderColorHover,
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
      };
    },
    valueContainer: css => ({
      ...css,
      paddingLeft: paddingExcludingBorder,
      paddingRight: paddingExcludingBorder,
      paddingBottom: isCompact ? 0 : 2,
      paddingTop: isCompact ? 0 : 2,
    }),
    clearIndicator: css => ({
      ...css,
      color: colors.N70,
      paddingLeft: ICON_PADDING,

      paddingRight: ICON_PADDING,

      paddingBottom: isCompact ? 0 : 6,

      paddingTop: isCompact ? 0 : 6,

      ':hover': {
        color: colors.N500,
      },
    }),
    loadingIndicator: css => ({
      ...css,
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
    }),
    dropdownIndicator: (css, { isDisabled }) => {
      let color = colors.N500;

      if (isDisabled) {
        color = colors.N70;
      }

      return {
        ...css,
        color,
        paddingLeft: ICON_PADDING,
        paddingRight: ICON_PADDING,
        paddingBottom: isCompact ? 0 : 6,
        paddingTop: isCompact ? 0 : 6,
        ':hover': {
          color: colors.N200,
        },
      };
    },
    indicatorsContainer: css => ({
      ...css,
      paddingRight: paddingExcludingBorder - ICON_PADDING,
    }),
    option: (css, { isFocused, isSelected }) => {
      const color = isSelected ? colors.N0 : colors.N100;// undefined;//
      let optionBackgroundColor;
      if(theme == 'light') {
        if (isSelected) optionBackgroundColor = colors.N500;
        else if (isFocused) optionBackgroundColor = colors.N30;
  
      } else {
        if (isSelected) optionBackgroundColor = colors.N900;
        else if (isFocused) optionBackgroundColor = colors.N900;
      }


      return {
        ...css,
        paddingTop: '6px',
        paddingBottom: '6px',
        optionBackgroundColor,
        color,
        zIndex: 99999,
      };
    },
    placeholder: css => ({ ...css, color: colors.N100 }),
    singleValue: (css, { isDisabled }) => ({
      ...css,
      color: isDisabled ? colors.N70 : colors.N800,
      lineHeight: `${gridSize() * 2}px`, // 16px
      color: textColor,
    }),
    menu: css => {
      return {
        ...css,
        zIndex: 99999,
      }

    },
    menuPortal: css => {
      return { ...css, zIndex: 9999 }
    }, 
    menuList: css => {
      let menuBackgroundColor;
      if( theme == 'light') {
        menuBackgroundColor = colors.N0
      } else {
        menuBackgroundColor = '#283447'
      }
      return {
        ...css,
        paddingTop: gridSize(),
        paddingBottom: gridSize(),
        backgroundColor: menuBackgroundColor,
        zIndex: 99999,
      }
    },
    multiValue: css => ({
      ...css,
      borderRadius: '2px',
      backgroundColor: colors.N40,
      color: colors.N500,
      maxWidth: '100%',
    }),
    multiValueLabel: css => ({
      ...css,
      padding: '2px',
      paddingRight: '2px',
      backgroundColor: theme == 'light' ? '#DFE1E6' : colors.N600,
      color: theme == 'light' ? '#42526E' : colors.N0,
    }),
    input: base => {
      return {
        ...base,
        color: textColor,
      }
    },

    multiValueRemove: (css, { isFocused }) => ({
      ...css,
      backgroundColor: isFocused && colors.R75,
      color: isFocused && colors.R400,
      paddingLeft: '2px',
      paddingRight: '2px',
      borderRadius: '0px 2px 2px 0px',
      ':hover': {
        color: colors.R400,
        backgroundColor: colors.R75,
      },
    }),
  };
}
