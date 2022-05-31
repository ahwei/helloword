import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Input, Box } from "../ui_kit";
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
      const returnValue = nextValue >= max ? max : nextValue;
      if (pre < max && nextValue !== pre) {
        onChange({
          target: {
            value: String(returnValue),
            name,
          },
        });
      }

      return returnValue;
    });
  };

  const onMinus = () => {
    setValue((pre) => {
      const nextValue = Number(pre) - step;
      const returnValue = nextValue <= min ? min : nextValue;
      if (pre > min && nextValue !== pre) {
        onChange({
          target: {
            value: String(returnValue),
            name,
          },
        });
      }

      return returnValue;
    });
  };

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const addLongPress = useLongPress(onAdd, 150, _value >= max);
  const minusLongPress = useLongPress(onMinus, 150, _value <= min);

  return (
    <Box alignItems="center" justifyContent="center">
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
          if (Number(e.target.value) !== value) {
            setValue(value);
          }
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
    </Box>
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
