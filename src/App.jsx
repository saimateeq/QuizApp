import WelcomePage from './pages/WelcomePage'
import MakeQuizPage from './pages/MakeQuizPage'
import PreviewQuiz from './pages/PreviewQuiz'
import  { BrowserRouter, Route, Routes } from "react-router-dom"
import { initializeApp  } from "firebase/app";
import { getDatabase  } from "firebase/database";
import QuizAppContext from './contexts/context';
import QuestionForm from './pages/QuestionForm';
import SignUp from './pages/SignUp';
import Login from './pages/LoginPage';
import JoinQuizForm from './pages/JoinQuizForm';
import Quiz from './pages/Quiz';
import CheckScores from "./pages/CheckScores";
import UIpage from './pages/UIpage';

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDUPx9iJu4lu8DVHf1hdoY5ol3vCuHVBbE",
    authDomain: "quiz-app-by-saim.firebaseapp.com",
    databaseURL: "https://quiz-app-by-saim-default-rtdb.firebaseio.com",
    projectId: "quiz-app-by-saim",
    storageBucket: "quiz-app-by-saim.appspot.com",
    messagingSenderId: "1063718332014",
    appId: "1:1063718332014:web:e1e918287c0d12822da87f",
    measurementId: "G-LD1LT0VWB1"
    };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  return (
    <QuizAppContext.Provider
    value={{
      database,
    }}>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={WelcomePage}/>
      <Route path='/makequiz' Component={MakeQuizPage}/>
      <Route path='/QuestionForm' Component={QuestionForm}/>
      <Route path='/PreviewQuiz' Component={PreviewQuiz}/>
      <Route path='/SignUp' Component={SignUp}/>
      <Route path='/Login' Component={Login}/>
      <Route path='/JoinQuizForm' Component={JoinQuizForm}/>
      <Route path='/Quiz' Component={Quiz}/>
      <Route path='/CheckScores' Component={CheckScores}/>
      <Route path='/UIpage' Component={UIpage}/>
      </Routes>
    </BrowserRouter>
    </QuizAppContext.Provider>
  )
  }
export default App