import styled from "styled-components";

interface FieldsetProps {
  children: React.ReactNode,
  fieldsetProps: {
    columns?: number, 
    [prop: string]: any
  }
};

function Fieldset({ children, fieldsetProps={} }: FieldsetProps) {
  console.log(fieldsetProps);
  return (
    <FormFieldset {...fieldsetProps}>
      {children}
    </FormFieldset>
  );
}

export default Fieldset;

const FormFieldset = styled.fieldset<FieldsetProps['fieldsetProps']>`
  display: grid;
  grid-template-columns: ${props => " auto".repeat(props.columns || 2)};
  grid-row-gap: 10px;
  border: 0;

  input:disabled, button:disabled {
    opacity: 0.5;
  }
`;