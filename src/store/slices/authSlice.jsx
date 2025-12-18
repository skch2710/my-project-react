import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";
import { LOGIN_API, LOGOUT_API } from "../../utils/constants";

/* ================== STATE ================== */
const initialState = {
  isAuthenticated: false,
  emailId: null,
  login: {
    loading: false,
    error: null,
  },
};

/* ================== LOGIN ================== */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      payload.requestVerifyToken = import.meta.env.VITE_REQUEST_VERIFY_TOKEN;

      const response = await POST(LOGIN_API, payload);

      if (response.statusCode === 200) {
        return { emailId: payload.emailId };
      }

      return rejectWithValue(response?.errorMessage);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================== LOGOUT ================== */
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await POST(LOGOUT_API);
  return true;
});

/* ================== SLICE ================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginState(state) {
      state.login = { loading: false, error: null };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.isAuthenticated = true;
        state.emailId = action.payload.emailId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

/* ================== SELECTORS ================== */
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoginLoading = (state) => state.auth.login.loading;
export const selectLoginError = (state) => state.auth.login.error;

/* ================== EXPORTS ================== */
export const { resetLoginState } = authSlice.actions;
export default authSlice.reducer;
