import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../../utils/axiosHelper";
import { USER_PROFILE_API } from "../../utils/constants";
import { logoutUser } from "./authSlice";

/* ================== STATE ================== */
const initialState = {
  user: null,
  navigations: [],
  userPrivileges: [],
  profileLoaded: false,
  profile: {
    loading: false,
    error: null,
  },
};

/* ================== PROFILE ================== */
export const profile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GET(USER_PROFILE_API);

      if (response.statusCode === 200) {
        return response.data; // { user, navigations }
      }

      return rejectWithValue(response.errorMessage);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================== SLICE ================== */
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.profile.loading = true;
        state.profile.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        const { user, navigations } = action.payload || {};

        state.user = user ?? null;
        state.userPrivileges = user?.userPrivilege ?? [];
        state.navigations = navigations ?? [];
        state.profileLoaded = true;

        state.profile.loading = false;
        state.profile.error = null;
      })
      .addCase(profile.rejected, (state, action) => {
        state.profile.loading = false;
        state.profile.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

/* ================== SELECTORS ================== */
export const selectUser = (state) => state.user.user;

export const selectUserName = (state) => {
  const user = state.user.user;
  return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
};

export const selectNavigations = (state) => state.user.navigations;
export const selectUserPrivileges = (state) => state.user.userPrivileges;
export const selectProfileLoaded = (state) => state.user.profileLoaded;

/* ================== EXPORT ================== */
export default userSlice.reducer;
