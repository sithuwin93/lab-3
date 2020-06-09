export const IEMaxHeightCalcPx = 1;
export const flexMaxHeightIEFix = `
  max-height: 100%;
  @media only screen and (-ms-high-contrast:active), (-ms-high-contrast:none) {
    max-height: calc(100% - ${IEMaxHeightCalcPx}px);
  }
`;
