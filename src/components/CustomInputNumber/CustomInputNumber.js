import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../ui_kit";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import useLongPress from "../../lib/useLongPress";

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

      if (pre > min) {
        onChange({
          target: {
            value: String(nextValue),
            name,
          },
        });
      }

      return nextValue <= min ? min : nextValue;
    });
  };

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const addLongPress = useLongPress(onAdd, 100);
  const minusLongPress = useLongPress(onMinus, 100);

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
      <Button disabled={_value <= min} {...minusLongPress} onClick={onMinus}>
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
        onClick={onAdd}
        {...addLongPress}
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
