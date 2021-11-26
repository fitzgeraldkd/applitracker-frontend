import styled from "styled-components";

function Fieldset({ children, columns=2, ...fieldsetProps }) {
  console.log(fieldsetProps);
  return (
    <FormFieldset columns={columns} {...fieldsetProps}>
      {children}
    </FormFieldset>
  );
}

export default Fieldset;

const FormFieldset = styled.fieldset`
  display: grid;
  grid-template-columns: ${props => " auto".repeat(props.columns)};
  grid-row-gap: 10px;
  border: 0;

  input:disabled, button:disabled {
    opacity: 0.5;
  }
`;