import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Box } from "../ui_kit";
import CustomInputNumber from "./CustomInputNumber";
//最多4人
const RoomItem = memo(({ adult, child, max = 4, onChange, disabled }) => {
  const [_adult, setAdult] = useState(adult);
  const [_child, setCild] = useState(child);

  return (
    <Box
      flexDirection="column"
      style={{
        borderBottom: "1px solid #dedede",
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Box>房間:{_adult + _child}人</Box>
      <Box alignItems="center">
        <Box flexDirection="column">
          <span>大人</span>
          <span style={{ color: "#ababab" }}>(20歲以上)</span>
        </Box>
        <CustomInputNumber
          min={1}
          max={max - _child}
          step={1}
          name={"CustomInputNumber"}
          value={_adult}
          disabled={disabled}
          onChange={(Event) => {
            // console.log("onChange", Event.target.value);
            setAdult(Number(Event.target.value));
            onChange({
              adult: Number(Event.target.value),
              child: _child,
            });
          }}
          onBlur={(Event) => {
            // console.log("onBlur", Event.target.name);
          }}
        />
      </Box>
      <Box alignItems="center">
        <Box>
          <span>小孩</span>
        </Box>
        <CustomInputNumber
          min={0}
          max={max - _adult}
          step={1}
          name={"CustomInputNumber"}
          value={child}
          disabled={_adult == max || disabled}
          onChange={(Event) => {
            // console.log("onChange", Event.target.value);

            onChange({
              adult: _adult,
              child: Number(Event.target.value),
            });
            setCild(Number(Event.target.value));
          }}
          onBlur={(Event) => {
            console.log("onBlur", Event.target.name);
          }}
        />
      </Box>
    </Box>
  );
});

RoomItem.propTypes = {};

export default RoomItem;
