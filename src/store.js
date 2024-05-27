import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  quiztitleReducer  from './reducers/TitleReducer'
import passcodeReducer from './reducers/PasscodeReducer'
import  NoOfQueReducer  from './reducers/NoOfQueReducer'
import  NoOfOptReducer  from './reducers/NoofOptReducer'
import  EachScoreReducer  from './reducers/EachScoreReducer'
import  TimeProReducer  from './reducers/TimeProReducer'
import QuestionsReducer from './reducers/QueArrayReducer' 
import EditFormShowReducer from './reducers/EditFormShow'
import  userObjReduer  from './reducers/userObjReduer'
import QuizReducer from './reducers/QuizReducer'
import StudentObjReducer from './reducers/StudentObjReducer'

const RootReducers = combineReducers({
   quiztitle: quiztitleReducer,
   passcode: passcodeReducer,
   NoOfQue: NoOfQueReducer,
   NoOfOpt: NoOfOptReducer,
   EachScore: EachScoreReducer,
   TimePro: TimeProReducer,
   Questions :QuestionsReducer ,
   EditFormShow : EditFormShowReducer,
   UserObj : userObjReduer,
   Quiz : QuizReducer,
   StudentObj : StudentObjReducer,
})
export default configureStore({
    reducer: RootReducers,
})