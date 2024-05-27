import { createSlice } from "@reduxjs/toolkit";

export const TimeProSlice = createSlice({
    name: 'TimePro',
    initialState: {
        value: 0,
    },
    reducers: {
        setTimePro: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setTimePro } = TimeProSlice.actions
export default TimeProSlice.reducer