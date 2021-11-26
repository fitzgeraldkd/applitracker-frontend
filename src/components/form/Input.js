import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from '../../context/theme';

// function Input({ type='text', name, id, onChange, label }) {
function Input( props ) {
  const { theme, setTheme } = useContext(ThemeContext);

  const { label, ...inputProps } = props;
  // if (!id) id = name;
  if (!inputProps.id) inputProps.id = inputProps.name;
  return (
    <>
      {label ? <label htmlFor={inputProps.id}>{label}</label> : null}
      <InputField themeMode={theme} { ...inputProps } />
    </>
  );
}

export default Input;

const InputField = styled.input`

  border-radius: 3px;
  border-color: ${props => props.theme.colors[props.themeMode].input.border};
  border-style: solid;
  border-width: 1px;

  background-color: ${props => props.theme.colors[props.themeMode].input.background};
  color: ${props => props.theme.colors[props.themeMode].input.text};
`;