import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
