import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
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
  const [_value, setValue] = useState(value);
  const [firstTimeLoad, setFirestTimeLoad] = useState(false);

  const onAdd = useCallback(() => {
    if (!disabled)
      //假設已經滿了 longpress需要暫停
      setValue((pre) => {
        const nextValue = Number(pre) + step;
        const returnValue = nextValue >= max ? max : nextValue; //不超過最大值

        return returnValue;
      });
  }, [_value, disabled]);

  const onMinus = useCallback(() => {
    setValue((pre) => {
      const nextValue = Number(pre) - step;
      const returnValue = nextValue <= min ? min : nextValue; //不低於最小值

      return returnValue;
    });
  }, [_value, disabled]);

  useEffect(() => {
    if (!firstTimeLoad) {
      //第一次載入不執行
      setFirestTimeLoad(true);
    } else {
      if (_value >= min && _value <= max) {
        onChange({
          target: {
            value: String(_value),
            name,
          },
        });
      }
    }
  }, [_value]);

  const addLongPress = useLongPress(onAdd, 150);
  const minusLongPress = useLongPress(onMinus, 150);

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
          //離開時資料沒更新 變回原形
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
