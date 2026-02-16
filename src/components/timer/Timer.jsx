import React, { useEffect, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Timer = ({ minutes = 5, onExpire, restartKey }) => {
  const expiryTime = useMemo(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  }, [minutes, restartKey]);

  const {
    seconds,
    minutes: remainingMinutes,
    restart,
  } = useTimer({
    expiryTimestamp: expiryTime,
    autoStart: true,
    onExpire: () => onExpire?.(),
  });

  useEffect(() => {
    restart(expiryTime, true);
  }, [expiryTime, restart]);

  const isLastMinute = remainingMinutes === 0;
  const color = isLastMinute ? "red" : "blue";

  return (
    <div style={{ fontSize: 16, fontWeight: 600, color }}>
      <AccessTimeIcon fontSize="small" style={{ verticalAlign: "top", marginRight: 4 }} />
      {String(remainingMinutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
};

export default Timer;
