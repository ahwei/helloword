import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import CustomInputNumber from "./components/CustomInputNumber";
import RoomItem from "./components/Room/RoomItem";
import { Container } from "./components/ui_kit";

const theme = {
  primary: "#1E9FD2",
  primaryDisabled: "#9FD2E9",
  secondary: "#BFBFBF",
};

const App = (props) => {
  const [value, setValue] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CustomInputNumber
          min={1}
          max={10}
          step={1}
          name={"CustomInputNumber"}
          value={value}
          disabled={false}
          onChange={(Event) => {
            console.log("onChange", Event.target.value);
          }}
          onBlur={(Event) => {
            console.log("onBlur", Event.target.name);
          }}
        />
        <RoomItem adult={1} child={0} />
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
