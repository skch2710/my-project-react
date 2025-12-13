import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTimer } from "react-timer-hook";
import { logoutUser } from "../../store/slices/authSlice";
import PopupSmall from "../popup/PopupSmall";

const IdleLogout = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  /* =====================
     TIMER (60s countdown)
  ===================== */
  const getExpiryTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    return time;
  };

  const { seconds, restart } = useTimer({
    expiryTimestamp: getExpiryTime(),
    autoStart: false,
    onExpire: () => handleIdle(),
  });

  /* =====================
     HANDLERS
  ===================== */
  const handleIdle = useCallback(() => {
    setShowModal(false);
    dispatch(logoutUser());
  }, [dispatch]);

  const handlePrompt = useCallback(() => {
    setShowModal(true);
    restart(getExpiryTime(), true);
  }, [restart]);

  /* =====================
     IDLE TIMER CONFIG
  ===================== */
  const idleTimerConfig = useMemo(
    () => ({
      timeout: 1000 * 60 * 2, // 2 minutes
      promptBeforeIdle: 1000 * 60 * 1, // 1 minute
      onPrompt: handlePrompt,
      onIdle: handleIdle,
      debounce: 500,
      crossTab: true,
      syncTimers: 1000,
    }),
    [handlePrompt, handleIdle]
  );

  const { reset } = useIdleTimer(idleTimerConfig);

  const handleContinue = useCallback(() => {
    setShowModal(false);
    reset();
  }, [reset]);

  /* =====================
     POPUP PROPS
  ===================== */
  const popupProps = useMemo(
    () => ({
      open: showModal,
      handleClose: handleContinue,
      title: "Session Expiring",
      submitButtonProps: {
        label: "Stay Logged In",
        onClick: handleContinue,
        color: "success"
      },
      children: (
        <Box sx={{ pt: 1 }}>
          <Typography>
            You will be logged out in <b>{seconds}</b>{" "}
            {seconds === 1 ? "second" : "seconds"} due to inactivity.
          </Typography>
        </Box>
      ),
    }),
    [showModal, handleContinue, seconds]
  );

  return <PopupSmall {...popupProps} />;
};

export default IdleLogout;
