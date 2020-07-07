// @flow
import theme from 'shared/theme';
import styled, { css } from 'styled-components';
import { Truncate } from 'src/components/globals';
import { Link } from 'react-router-dom';
import { hexa } from 'src/components/globals';
import { themed, colors } from 'src/components/theme';

export const CardLink = styled(Link)`
  display: block;
  position: relative;
`;

// export const Row = styled.div`
//   padding: 12px 16px;
//   align-items: center;
//   display: grid;
//   grid-template-rows: auto;
//   grid-template-areas: 'content actions';
//   grid-template-columns: 1fr auto;
//   background: ${props =>
//     props.isActive ? themed({ light: hexa(theme.text.default, 0.04), dark: hexa(theme.textd.default, 0.04)})
//     :themed({ light: theme.bg.default, dark: theme.bgd.default})};
//   border-bottom: 1px solid ${themed({ light:theme.bg.divider , dark:theme.bgd.divider })};
//   grid-gap: 16px;

//   &:hover {
//     background: ${() =>themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
//     cursor: pointer;
//   }

//   ${props =>
//     props.isActive &&
//     css`
//       box-shadow: inset 3px 0 0 ${themed({ light: theme.text.default, dark: theme.textd.default})};
//     `}
// `;

export const Row = styled.div`
  padding: 12px 16px;
  align-items: center;
  display: grid;
  grid-template-rows: auto;
  grid-template-areas: 'content actions';
  grid-template-columns: 1fr auto;


  transition: background 0.1s, color 0.1s;
  // background: linear-gradient(145deg, #ffffff, #dcdcdc);
  // box-shadow:  3px 3px 5px #bebebe, 
  //              -3px -3px 5px #ffffff;


  grid-gap: 16px;
  color: ${props => (props.isActive ? 
    themed({ light: colors.B400, dark: colors.B100 })
    : themed({ light:theme.text.alt , dark:theme.textd.alt }))};

  &:hover {
    background: ${() =>themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    cursor: pointer;
  }

  ${props =>
    props.isActive &&
    css`
      background-color: #f4f4f4;
      color: #bdbdbd;
      cursor: default;
      background: #f4f4f4;
      box-shadow: inset 3px 3px 5px #cbcbcb, 
                  inset -3px -3px 5px #ffffff;
                  border-radius: 12px;
                  padding: 8px 12px;
                  margin: 4px;

      // box-shadow: inset 3px 0 0 ${() => themed({ light: colors.B400, dark: colors.B100 })};
      // background-color: ${() => themed({ light: colors.N30A, dark: colors.N500A })};
    `}
`;
  // background: ${props =>
  //   props.isActive ? 
  //   themed({ light:hexa(theme.text.default, 0.04), dark:hexa(theme.textd.default, 0.04) })
  //    : themed({ light: theme.bg.default, dark:theme.bgd.default })};
  // border-bottom: 1px solid ${themed({ light:theme.bg.divider , dark:theme.bgd.divider })};









export const RowWithAvatar = styled.div`
  padding: 12px 16px;
  align-items: center;
  display: grid;
  grid-template-areas: 'avatar content actions';
  grid-template-columns: min-content 1fr auto;
  grid-template-rows: auto;
  background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  border-bottom: 1px solid ${themed({ light:theme.bg.divider , dark: theme.bgd.divider})};
  grid-gap: 16px;
  flex: 1;

  &:hover {
    background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    cursor: pointer;
  }
  border-radius: 0 0 20px 20px;
`;

export const UserAvatarContainer = styled.div`
  height: 40px;
  grid-area: avatar;
  align-self: flex-start;
`;

export const CommunityAvatarContainer = styled.div`
  height: 32px;
  grid-area: avatar;
  align-self: flex-start;
`;

export const Content = styled.div`
  grid-area: content;
  display: grid;
`;

export const Label = styled.div`
  // color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  color: ${props => (props.isActive ? 
    themed({ light: colors.B400, dark: colors.B100 })
    : themed({ light:theme.text.alt , dark:theme.textd.alt }))};
  

  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  display: inline-block;
  align-items: center;
  min-width: 0;
  ${Truncate};

  .icon {
    color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
    margin-right: 6px;
    position: relative;
    top: 1px;
  }
`;

export const Sublabel = styled.span`
  font-size: 15px;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  font-weight: 400;
  line-height: 1.2;
  display: inline-block;
  ${Truncate};
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.3;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  margin-top: 6px;
  padding-right: 24px;
  word-break: break-word;
`;

export const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  flex: 1;
  padding-top: 4px;
`;

export const ChannelActions = styled(Actions)`
  flex-direction: row;
  padding: 12px 16px 12px 12px;
`;

export const ChannelRow = styled(Row)`
  padding: 0;
`;

export const ChannelContent = styled(Content)`
  padding: 12px 16px;
`;


export const SettingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100%;
  background-color: linear-gradient(145deg, #ffffff, #ddddde);
  box-shadow: 5px 5px 10px #ddddde, -5px -5px 10px #ffffff:  
  transition: all 300ms ease-in-out;

  div svg path, rect {
    fill: ${props => props.glyph == 'notification' ? '#3ce7a2':'#e74c3c' };
  }
`
export const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100%;
  background-color: linear-gradient(145deg, #ffffff, #ddddde);
  box-shadow: ${props => props.glyph == 'notification' ? 
  '5px 5px 10px #ddddde, -5px -5px 10px #ffffff':
  'inset 5px 5px 10px #ddddde, inset -5px -5px 10px #ffffff'};
  

  transition: all 300ms ease-in-out;

  div svg path, rect {
    fill: ${props => props.glyph == 'notification' ? '#3ce7a2':'#e74c3c' };
  }

`