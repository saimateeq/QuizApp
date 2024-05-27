import { createSlice } from "@reduxjs/toolkit";

export const passcodeSlice = createSlice({
    name: 'passcode',
    initialState: {
      value: "",
    },
    reducers: {
      setPasscode: (state,action) => {
        state.value=action.payload
      },
    },
  })

export const { setPasscode } = passcodeSlice.actions
export default passcodeSlice.reducer