import React, { useState, useEffect, useCallback } from "react";

export default function useLongPress(callback = () => {}, ms = 300, onStop) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  //   useCallback 才不會每次都呼叫
  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onMouseOut: stop,
  };
}
