import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import RoomItem from "./RoomItem";
import { Box } from "../ui_kit";

const getSum = (rooms) => {
  let sum = 0;
  rooms.forEach((room) => {
    sum += room.adult + room.child;
  });

  return sum;
};

const RoomAllocation = ({ onChange, guest, room }) => {
  const [rooms, setRooms] = useState([]);

  const sum = useMemo(() => {
    if (rooms.length > 0) {
      return getSum(rooms);
    }

    return 0;
  }, [rooms]);

  const onChageRoom = (newValue, index) => {
    const newRoom = rooms.map((item, i) => {
      if (i == index) {
        return newValue;
      } else {
        return item;
      }
    });
    setRooms(newRoom);

    // const sum = getSum(newRoom);
    // console.log(sum);

    // rooms[index] = newValue;

    // onChange(newRoom);
  };

  console.log(sum);

  //builddata
  useEffect(() => {
    let pushRoomData = [];

    for (let i = 0; i < room; i++) {
      pushRoomData.push({ adult: 1, child: 0 });
    }

    setRooms(pushRoomData);
  }, [room]);

  return (
    <Box flexDirection="column">
      <Box>
        <h3>
          住客人數：{guest}人/{room}房
        </h3>
      </Box>

      <Box>
        <h3>尚未分配：{guest - sum}人</h3>
      </Box>
      {rooms.map((item, index) => {
        return (
          <RoomItem
            adult={item.adult}
            child={item.child}
            onChange={(value) => {
              onChageRoom(value, index);
            }}
            key={index}
            disabled={sum >= guest}
          />
        );
      })}
    </Box>
  );
};

RoomAllocation.propTypes = {};

export default RoomAllocation;
