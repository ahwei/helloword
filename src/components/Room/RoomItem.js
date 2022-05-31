import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "../ui_kit";

const RoomItem = ({ adult, child }) => {
  const [_adult, setAdult] = useState(adult);
  const [_child, setCild] = useState(child);

  return (
    <Box flexDirection="column">
      <Box>房間:{_adult + _child}人</Box>
      <Box>A</Box>
      <Box>B</Box>
    </Box>
  );
};

RoomItem.propTypes = {};

export default RoomItem;
