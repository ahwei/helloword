import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../ui_kit";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

const CustomInputNumber = ({
  value,
  onChange,
  onBlur,
  min,
  max,
  step,
  disabled,
  name,
}) => {
  const [_value, setValue] = useState(0);
  const intervalRef = useRef(null);

  const onAdd = () => {
    setValue((pre) => {
      const nextValue = Number(pre) + step;

      if (pre < max) {
        onChange({
          target: {
            value: String(nextValue),
            name,
          },
        });
      }

      return nextValue >= max ? max : nextValue;
    });
  };

  const onMinus = () => {
    setValue((pre) => {
      const nextValue = Number(pre) - step;

      return nextValue <= min ? min : nextValue;
    });
  };

  const startCounter = (fun) => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      fun();
    }, 150);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const bind = useLongPress(onAdd, {
    onStart: () => console.log("Press started"),
    onFinish: () => console.log("Long press finished"),
    onCancel: () => console.log("Press cancelled"),
    // onMove: () => console.log("Detected mouse or touch movement"),
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #000",
      }}
    >
      <Button
        disabled={_value <= min}
        // onMouseDown={() => startCounter(onMinus)}
        // onMouseUp={stopCounter}
        // onMouseLeave={stopCounter}
        onClick={onMinus}
      >
        <IoIosRemove size={35} />
      </Button>
      <Input
        type="number"
        value={_value}
        min={min}
        max={max}
        name={name}
        onChange={(e) => {
          setValue(e.target.value);

          if (Number(e.target.value) >= min && Number(e.target.value) <= max)
            onChange(e);
        }}
        onBlur={(e) => {
          onBlur(e);
        }}
        disabled={disabled}
      />
      <Button
        disabled={disabled || _value >= max}
        // onMouseDown={() => startCounter(onAdd)}
        // onMouseUp={stopCounter}
        // onMouseLeave={stopCounter}
        onClick={onAdd}
      >
        <IoIosAdd size={35} />
      </Button>
    </div>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CustomInputNumber;
