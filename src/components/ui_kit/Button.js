import styled from "styled-components";

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin: 8px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: transparent;
  color: ${(props) => props.theme.primary};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  justify-content: center;
  align-items: center;
  -webkit-box-align: center;
  :disabled {
    border: 1px solid ${(props) => props.theme.primaryDisabled};
    color: ${(props) => props.theme.primaryDisabled};
  }
  :focus {
    box-shadow: rgb(30 159 210 / 48%) 0px 0px 0px 2px;
  }
`;

export default Button;
