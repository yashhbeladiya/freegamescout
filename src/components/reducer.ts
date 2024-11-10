// Navbar search reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setSearchTerm } = navbarSlice.actions;

export default navbarSlice.reducer;