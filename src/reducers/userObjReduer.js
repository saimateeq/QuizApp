import { createSlice } from "@reduxjs/toolkit";

export const UserObjSlice = createSlice({
    name: 'UserObj',
    initialState: {
        value: {
            Name: "",
            Email: "",
            Password: "",
            Quizs: {
                Quiz: {
                    Students : {},
                    Title: "",
                    Passcode: "",
                    TotalQue: 0,
                    EachScore: 0,
                    TimePro: 0,
                    Questions: []
                }
            }
        },
    },
    reducers: {
        setName: (state, action) => {
            state.value.Name = action.payload
        },
        setEmail: (state, action) => {
            state.value.Email = action.payload
        },
        setPassword: (state, action) => {
            state.value.Password = action.payload
        },
        setQuiz: (state, action) => {
            state.value.Quizs.Quiz = action.payload
        },
        setQue: (state, action) => {
            state.value.Quizs.Quiz.Questions = action.payload
        },
        setEditQuestion: (state, action) => {
            state.value.Quizs.Quiz.Questions[action.payload.EditingIndex] = action.payload.EditedQue
        },
    },
})
export const { setUserID, setName, setPassword, setEmail, setQuiz, setQue, setEditQuestion, setQuizID } = UserObjSlice.actions
export default UserObjSlice.reducer