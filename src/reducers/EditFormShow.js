import { createSlice } from "@reduxjs/toolkit";

export const EditFormShowSlice = createSlice({
    name: 'EditFormShow',
    initialState: {
        value: false,
    },
    reducers: {
        setEditVisibility: (state, action) => {
            state.value = action.payload
        },
    },
})
export const { setEditVisibility } = EditFormShowSlice.actions
export default EditFormShowSlice.reducer