import { createSlice } from "@reduxjs/toolkit";
export const NoOfOptSlice = createSlice({
    name: 'NoOfOpt',
    initialState: {
        value: 0,
    },
    reducers: {
        setNoOfOpt: (state, action) => {
            state.value = action.payload
        },
    },
})
export const { setNoOfOpt } = NoOfOptSlice.actions
export default NoOfOptSlice.reducer
