import { createSlice } from "@reduxjs/toolkit";

export const QuizSlice = createSlice({
    name: 'Quiz',
    initialState: {
      value:{
          Title: "",
          Passcode: "",
          TotalQue: 0,
          EachScore: 0,
          TimePro: 0,
          Questions: [],
          Students : {}
        
      },
    },
    reducers: {
      setQuiz: (state,action) => {
        state.value=action.payload
      },
    },
  })

export const { setQuiz } = QuizSlice.actions
export default QuizSlice.reducer  