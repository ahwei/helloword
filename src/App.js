import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import CustomInputNumber from "./components/Room/CustomInputNumber";
import RoomAllocation from "./components/Room/RoomAllocation";
import { Container } from "./components/ui_kit";

const theme = {
  primary: "#1E9FD2",
  primaryDisabled: "#9FD2E9",
  primaryLight: "#f0fdff",
  secondary: "#BFBFBF",
};

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div
          style={{
            maxWidth: 400,
            width: "80%",
            padding: 20,
            margin: 20,
            border: "3px dashed #ccc",
          }}
        >
          <RoomAllocation
            guest={35}
            room={9}
            onChange={(result) => console.log(result)}
          />
        </div>
        {/* <CustomInputNumber
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
        /> */}
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
