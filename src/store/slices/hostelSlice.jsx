import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";
import {
  HOSTELLER_SAVE_OR_UPDATE_API,
  HOSTELLER_GET_API,
} from "../../utils/constants";

/* -------------------------------------------------------
  Common error handler
------------------------------------------------------- */
const getErrorMessage = (error, defaultMsg) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  defaultMsg;

/* -------------------------------------------------------
  API Thunks
------------------------------------------------------- */

export const saveOrUpdateHosteller = createAsyncThunk(
  "hostel/saveOrUpdateHosteller",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await POST(HOSTELLER_SAVE_OR_UPDATE_API, payload);
      return response?.data;
    } catch (error) {
      console.error("Error saveOrUpdateHosteller:", error);
      return rejectWithValue(
        getErrorMessage(error, "Failed to save or update hosteller")
      );
    }
  }
);

const toDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";
  const [mm, dd, yyyy] = dateStr.split("/");
  return `${dd}-${mm}-${yyyy}`;
};

export const getHostellers = createAsyncThunk(
  "hostel/getHostellers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await POST(HOSTELLER_GET_API, payload);
      console.log("Responce : ",response);
      if (response.statusCode === 200 && response.data?.content) {
        const converted = response.data.content.map((item) => ({
          ...item,
          dob: toDDMMYYYY(item.dob),
          joiningDate: toDDMMYYYY(item.joiningDate),
        }));
        response.data.content = converted;
        console.log("Convered Data : ",response);
      }
      return response?.data;
    } catch (error) {
      console.error("Error getHostellers:", error);
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch hostellers")
      );
    }
  }
);

/* -------------------------------------------------------
  Initial State
------------------------------------------------------- */
const initialState = {
  form: {
    loading: false,
    data: null,
    error: null,
  },
  grid: {
    loading: false,
    data: [],
    error: null,
  },
};

/* -------------------------------------------------------
  Slice
------------------------------------------------------- */
const hostelSlice = createSlice({
  name: "hostel",
  initialState,
  reducers: {
    resetFormState: (state) => {
      state.form = { loading: false, data: null, error: null };
    },
    resetGridState: (state) => {
      state.grid = { loading: false, data: [], error: null };
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------------------------------------------------------
       saveOrUpdateHosteller
      ------------------------------------------------------- */
      .addCase(saveOrUpdateHosteller.pending, (state) => {
        state.form.loading = true;
        state.form.error = null;
      })
      .addCase(saveOrUpdateHosteller.fulfilled, (state, action) => {
        state.form.loading = false;
        state.form.data = action.payload;
      })
      .addCase(saveOrUpdateHosteller.rejected, (state, action) => {
        state.form.loading = false;
        state.form.error = action.payload;
      })

      /* -------------------------------------------------------
       getHostellers
      ------------------------------------------------------- */
      .addCase(getHostellers.pending, (state) => {
        state.grid.loading = true;
        state.grid.error = null;
      })
      .addCase(getHostellers.fulfilled, (state, action) => {
        state.grid.loading = false;
        state.grid.data = action.payload || [];
      })
      .addCase(getHostellers.rejected, (state, action) => {
        state.grid.loading = false;
        state.grid.error = action.payload;
      });
  },
});

/* -------------------------------------------------------
  Exports
------------------------------------------------------- */
export const { resetFormState, resetGridState } = hostelSlice.actions;
export default hostelSlice.reducer;
