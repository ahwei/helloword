import React, { useState, useEffect, useCallback, useTransition } from "react";

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  const [isPending, startTransition] = useTransition({
    timeoutMs: ms,
  });

  useEffect(() => {
    let timerId;

    if (startLongPress && !isPending) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress, isPending]);

  //   useCallback 才不會每次都呼叫
  const start = useCallback(() => {
    startTransition(() => {
      setStartLongPress(true);
    });
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
    onMouseOut: stop,
  };
}
