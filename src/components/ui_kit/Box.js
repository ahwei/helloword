import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

export default Box;
