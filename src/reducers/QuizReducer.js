import { createSlice } from "@reduxjs/toolkit";

export const QuizSlice = createSlice({
    name: 'Quiz',
    initialState: {
      value:{
          Title: " Demo Quiz",
          Passcode: "",
          TotalQue: 3,
          EachScore: 2,
          TimePro: 2,
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