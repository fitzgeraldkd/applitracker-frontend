import styled from 'styled-components';
import { useContext } from "react";
import { ThemeContext } from '../../context/theme';

interface IconLinkProps {
  children: React.ReactNode,
  tooltip?: {
    position: 'top' | 'right' | 'bottom' | 'left',
    text: string
  },
  iconLinkProps?: {
    [prop: string]: any
  }
}

function IconLink({ children, tooltip, iconLinkProps }: IconLinkProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <IconLinkContainer themeMode={theme} {...iconLinkProps}>
      {tooltip && <span className={'tooltip tooltip-' + tooltip.position}>{tooltip.text}</span>}
      {children}
    </IconLinkContainer>
  );
}

export default IconLink;

const IconLinkContainer = styled.span<{themeMode: 'light' | 'dark'}>`
  position: relative;
  color: ${props => props.theme.colors[props.themeMode].link.text};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors[props.themeMode].link.textHover};
    svg {
      background-color: ${props => props.theme.colors[props.themeMode].link.backgroundHover};
      border-radius: 3px;
    }
    .tooltip {
      visibility: visible;
      display: inline;
    }
  }

  .tooltip {
    visibility: hidden;
    background-color: ${props => props.theme.colors[props.themeMode].tooltip.background};
    color: ${props => props.theme.colors[props.themeMode].tooltip.text};
    position: absolute;
    z-index: 1;
    border-radius: 3px;
    padding: 3px;
    box-sizing: border-box;
    white-space: nowrap;

    &.tooltip-bottom {
      top: 100%;
      /* left: 50%; */
      margin-left: 50%;
      transform: translateX(-50%);
    }

    &.tooltip-right {
      /* top: 100%; */
      left: 110%;
      /* margin-left: -50%; */
    }
  }
`;