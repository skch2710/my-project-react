import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, resetProfileState } from "../store/slices/userSlice";
import Loader from "../components/loader/Loader";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const profileRequested = useSelector((s) => s.user.profileRequested);
  const profileLoaded = useSelector((s) => s.user.profileLoaded);
  const loading = useSelector((s) => s.user.profile.loading);
  const error = useSelector((s) => s.user.profile.error);

  useEffect(() => {
    if (isAuthenticated && !profileLoaded && !loading && !profileRequested) {
      dispatch(profile());
    }
  }, [isAuthenticated, profileLoaded, loading, profileRequested, dispatch]);

  // Block app only while profile is loading.
  if (isAuthenticated && loading) {
    return <Loader />;
  }

  // Error fallback
  if (error) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h3>Unable to load profile</h3>
        <p>{error}</p>
        <button
          onClick={() => {
            dispatch(resetProfileState());
            dispatch(profile());
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return children;
};

export default AppInitializer;
