import { createSlice } from "@reduxjs/toolkit";

export const QuestionsSlice = createSlice({
    name: 'Questions',
    initialState: {
      value: []
        },
    reducers: {
      setQuestions: (state,action) => {
        state.value=action.payload
      },
      setEditingValue : (state,action) => {
        state.value[action.payload].EditingValue = true 
      },
      setEditQue : (state,action)=>{
        state.value[action.payload.EditingIndex] = action.payload.EditedQue
      },
      DeleteQue : (state,action) => {
        state.value.splice(action.payload,1)
      }

    },
  })

export const { setQuestions , setEditingValue , setEditQue , DeleteQue} = QuestionsSlice.actions
export default QuestionsSlice.reducer