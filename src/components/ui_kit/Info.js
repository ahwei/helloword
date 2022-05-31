import styled from "styled-components";

const Info = styled.div`
  width: calc(100% - 10px);
  display: flex;
  flex-direction: "row";
  align-items: "center";
  justify-content: "flex-start";
  padding: 5px;
  background-color: ${(props) => props.theme.primaryLight};
  border: 1px solid ${(props) => props.theme.primaryDisabled};
  color: #666;
`;

export default Info;
