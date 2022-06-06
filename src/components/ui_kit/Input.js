import styled from "styled-components";

const Input = styled.input`
  width: 48px;
  height: 48px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.secondary};
  background-color: transparent;
  padding: 0;
  text-align: center;
  font-size: 16px;
  box-sizing: border-box;
  :disabled {
    border: 1px solid #dedede;
    color: 1px solid #dedede;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
  }
`;

export default Input;
