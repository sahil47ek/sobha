import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  password: string;
  isAuthenticated: boolean;
}

const initialState: AdminState = {
  password: 'admin123', // Default password - in a real app, this should be properly hashed and stored securely
  isAuthenticated: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateAdminPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { updateAdminPassword, setAuthenticated } = adminSlice.actions;
export default adminSlice.reducer; 