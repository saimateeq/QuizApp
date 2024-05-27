import { createSlice } from "@reduxjs/toolkit";

export const StudentObjSlice = createSlice({
    name: 'StudentObj',
    initialState: {
      value: {
        Obj : {
          Name : "",
          DateTimeOfSub : {},
          QueAns :[
          ],
          YourScore : 0,
        },
        QuizAddress : ""
      },
    },
    reducers: {
      setName: (state,action) => {
        state.value.Obj.Name=action.payload
      },
      UpdateScore : (state , action) => {
        state.value.Obj.YourScore = action.payload
      },
      setQuizAddress : (state , action) => {
        state.value.QuizAddress = action.payload
      },
      setQueAns  : (state , action) => {
        state.value.Obj.QueAns.push(action.payload) 
      },
      setDateOfSub : (state , action) => {
        state.value.Obj.DateTimeOfSub = action.payload
      }
    },
  })

export const { setName , UpdateScore , setQuizAddress , setQueAns , setDateOfSub} = StudentObjSlice.actions
export default StudentObjSlice.reducer