import { createSlice } from "@reduxjs/toolkit";

export const NoOfQueSlice = createSlice({
    name: 'NoOfQue',
    initialState: {
      value: 0,
    },
    reducers: {
      setNoOfQue: (state,action) => {
        state.value=action.payload
      },
    },
  })

export const { setNoOfQue } = NoOfQueSlice.actions
export default NoOfQueSlice.reducer  