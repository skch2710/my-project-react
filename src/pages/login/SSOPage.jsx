import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profile } from "../../store/slices/userSlice";
import { setAuthenticated } from "../../store/slices/authSlice";
import Loader from "../../components/loader/Loader";

const SSOPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile())
      .unwrap()
      .then(() => {
        dispatch(setAuthenticated());
        window.location.replace("/");
      })
      .catch(() => {
        window.location.replace("/login");
      });
  }, [dispatch]);

  return <Loader text="Signing you in..." />;
};

export default SSOPage;
