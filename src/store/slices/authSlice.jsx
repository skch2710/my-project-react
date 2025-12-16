import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";
import { LOGIN_API } from "../../utils/constants";

/* ================== INITIAL STATE ================== */
const initialState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  emailId: null,

  login: {
    loading: false,
    error: null,
  },
};

/* ================== LOGIN API ================== */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      payload.requestVerifyToken = import.meta.env.VITE_REQUEST_VERIFY_TOKEN;

      const response = await POST(LOGIN_API, payload);

      if (response.statusCode === 200 && response.data) {
        const { jwtDTO } = response.data;

        return {
          // Tokens
          token: jwtDTO?.access_token,
          refreshToken: jwtDTO?.refresh_token,
          emailId: payload.emailId,
        };
      }

      return rejectWithValue(response?.errorMessage || "Invalid credentials");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errorMessage || error.message || "Login failed"
      );
    }
  }
);

/* ================== LOGOUT API ================== */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => true
);

/* ================== SLICE ================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginState(state) {
      state.login = { loading: false, error: null };
    },

    updateToken(state, action) {
      if (action.payload?.access_token) {
        state.token = action.payload.access_token;
      }
      if (action.payload?.refresh_token) {
        state.refreshToken = action.payload.refresh_token;
      }
    },

    setAuth(state, action) {
      state.isAuthenticated = !!action.payload?.token;
      state.token = action.payload?.token || null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Login -------- */
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.isAuthenticated = true;

        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.tokenType = action.payload.tokenType;
        state.emailId = action.payload.emailId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
        state.isAuthenticated = false;
      })

      /* -------- Logout -------- */
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

/* ================== SELECTORS ================== */
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectLoginLoading = (state) => state.auth.login.loading;
export const selectLoginError = (state) => state.auth.login.error;

/* ================== EXPORTS ================== */
export const { resetLoginState, updateToken, setAuth } = authSlice.actions;
export default authSlice.reducer;