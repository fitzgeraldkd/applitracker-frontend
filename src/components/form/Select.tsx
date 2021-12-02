import { useContext } from 'react';
import styled from "styled-components";
import { ThemeContext } from '../../context/theme';

interface SelectProps {
  children: React.ReactNode,
  label: string,
  selectProps: {
    name: string,
    [prop: string]: any
  }
};

function Select( { children, label, selectProps }: SelectProps ) {
  // const { children, label, selectProps } = props;
  const { theme } = useContext(ThemeContext);

  if (!selectProps.id) selectProps.id = selectProps.name;

  return (
    <>
      {label ? <label htmlFor={selectProps.id}>{label}</label> : null}
      <SelectField themeMode={theme} { ...selectProps }>
        {children}
      </SelectField>
    </>
  );
}

export default Select;

const SelectField = styled.select<{ themeMode: 'light' | 'dark' }>`

  border-radius: 3px;
  border-color: ${props => props.theme.colors[props.themeMode].input.border};
  border-style: solid;
  border-width: 1px;

  background-color: ${props => props.theme.colors[props.themeMode].input.background};
  color: ${props => props.theme.colors[props.themeMode].input.text};
`;