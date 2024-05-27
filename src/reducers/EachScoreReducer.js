import { createSlice } from "@reduxjs/toolkit";

export const EachScoreSlice = createSlice({
    name: 'EachScore',
    initialState: {
        value: null,
    },
    reducers: {
        setEachScore: (state, action) => {
            state.value = action.payload
        },
    },
})
export const { setEachScore } = EachScoreSlice.actions
export default EachScoreSlice.reducer