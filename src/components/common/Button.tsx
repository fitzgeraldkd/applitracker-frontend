import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from '../../context/theme';

interface ButtonProps {
  children: React.ReactNode,
  buttonProps: {
    [prop: string]: any
  }
}

function Button({ children, buttonProps }: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <ButtonComp themeMode={theme} {...buttonProps}>
      {children}
    </ButtonComp>
  )
}

export default Button;

const ButtonComp = styled.button<ButtonProps['buttonProps']>`
  background-color: ${props => props.theme.colors[props.themeMode].button.background};
  color: ${props => props.theme.colors[props.themeMode].button.text};
  border-color: ${props => props.theme.colors[props.themeMode].button.border};
  border-style: solid;
  border-radius: 3px;
  /* transition: background-color 0.15s, border-color 0.15s; */

  &:hover {
    background-color: ${props => props.theme.colors[props.themeMode].button.hover.background};
  color: ${props => props.theme.colors[props.themeMode].button.hover.text};
  border-color: ${props => props.theme.colors[props.themeMode].button.hover.border};
  }
  
  &:active {
    background-color: ${props => props.theme.colors[props.themeMode].button.active.background};
    color: ${props => props.theme.colors[props.themeMode].button.active.text};
    border-color: ${props => props.theme.colors[props.themeMode].button.active.border};
  }

  &:disabled {
    background-color: ${props => props.theme.colors[props.themeMode].button.background};
    color: ${props => props.theme.colors[props.themeMode].button.text};
    border-color: ${props => props.theme.colors[props.themeMode].button.border};
    opacity: 0.5;
  }
`;