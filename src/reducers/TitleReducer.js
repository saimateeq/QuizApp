import { createSlice } from '@reduxjs/toolkit'

export const quiztitleSlice = createSlice({
  name: 'quiztitle',
  initialState: {
    value: "",
  },
  reducers: {
    setQuizTitle: (state, action) => {
      state.value = action.payload
    },
  },
})
export const { setQuizTitle } = quiztitleSlice.actions
export default quiztitleSlice.reducer