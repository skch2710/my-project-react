import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTimer } from "react-timer-hook";
import { logoutUser } from "../../store/slices/authSlice";
import PopupSmall from "../popup/PopupSmall";
import { setSessionExpired } from "../../store/slices/sessionSlice";

const IdleLogout = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  /* =====================
     EXPIRY TIME (60s)
  ===================== */
  const getExpiryTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    return time;
  };

  /* =====================
     IDLE HANDLER (LOGOUT)
  ===================== */
  const handleIdle = useCallback(() => {
    setShowModal(false);
    dispatch(setSessionExpired());
    dispatch(logoutUser());
  }, [dispatch]);

  /* =====================
     COUNTDOWN TIMER
  ===================== */
  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: getExpiryTime(),
    autoStart: false,
  });

  /* =====================
     PROMPT HANDLER
  ===================== */
  const handlePrompt = useCallback(() => {
    setShowModal(true);
    restart(getExpiryTime(), true);
  }, [restart]);

  /* =====================
     IDLE TIMER CONFIG
  ===================== */
  const idleTimerConfig = useMemo(
    () => ({
      timeout: 1000 * 60 * 5, // 5 minutes
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

  /* =====================
     CONTINUE SESSION
  ===================== */
  const handleContinue = useCallback(() => {
    pause();
    setShowModal(false);
    reset();
  }, [pause, reset]);

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
        color: "success",
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
