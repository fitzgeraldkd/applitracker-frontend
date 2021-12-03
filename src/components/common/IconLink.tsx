import styled from 'styled-components';
import { useContext } from "react";
import { ThemeContext } from '../../context/theme';

interface IconLinkProps {
  children: React.ReactNode,
  iconLinkProps?: {
    [prop: string]: any
  }
}

function IconLink({ children, iconLinkProps }: IconLinkProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <IconLinkContainer themeMode={theme} {...iconLinkProps}>
      {children}
    </IconLinkContainer>
  );
}

export default IconLink;

const IconLinkContainer = styled.span<{themeMode: 'light' | 'dark'}>`
    color: ${props => props.theme.colors[props.themeMode].link.text};
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors[props.themeMode].link.textHover};
      svg {
        background-color: ${props => props.theme.colors[props.themeMode].link.backgroundHover};
        border-radius: 3px;
      }
    }
`;