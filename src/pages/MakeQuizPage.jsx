import { child, get, ref } from 'firebase/database'
import "../App.css"
import React, { useContext, useEffect, useRef, useState } from 'react'
import QuizAppContext from '../contexts/context'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setQuizTitle } from '../reducers/TitleReducer'
import { setPasscode } from '../reducers/PasscodeReducer'
import { setNoOfQue } from '../reducers/NoOfQueReducer'
import { setNoOfOpt } from '../reducers/NoofOptReducer'
import { setEachScore } from '../reducers/EachScoreReducer'
import { setTimePro } from '../reducers/TimeProReducer'
import { setQuiz } from '../reducers/userObjReduer'
import UIpage from './UIpage'

const MakeQuizPage = () => {
  const context = useContext(QuizAppContext)
  const CodeInp = useRef(null)
  const TitleInp = useRef(null)
  const NoOfQueInp = useRef(null)
  const NoOfOptInp = useRef(null)
  const EachScoreInp = useRef(null)
  const TimeProInp = useRef(null)
  const [CodeState, setCodeState] = useState("")
  const [CodeStateColor, setCodeStateColor] = useState("")
  const [PassCodesArray, setPassCodesArray] = useState([])
  const [PasscodeShow, setPasscodeShow] = useState(false)
  const [PasscodeIconClass, setPasscodeIconClass] = useState("bi bi-eye-slash-fill")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const CodeGenerateArray =
    ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'
      , 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'
      , 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const GetPasscode = () => {
    get(child(ref(context?.database), "users")).then((snapshot) => {
      if (snapshot.exists()) {
        let Users = snapshot.val()
        Object.keys(Users).forEach(key => {
          let Quizs = Users[key].User.Quizs
          Object.keys(Quizs).forEach(key => {
            setPassCodesArray(prevArray => [...prevArray, Quizs[key].Quiz.Passcode])
          })
        })
      } else {
        console.log(error);
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    GetPasscode()
  }, [])
  const CodeValuefunc = () => {
    if (CodeInp?.current?.value.length < 8) {
      setCodeState("Too Short")
      setCodeStateColor("text-red-600 font-bold text-lg")
    } else {
      setCodeState("Code is Correct")
      setCodeStateColor("text-green-600 font-bold")
    }
    PassCodesArray.forEach(value => {
      if (CodeInp?.current?.value === value) {
        setCodeState("This Code Is Taken")
        setCodeStateColor("text-yellow-500 font-bold")
      }
    })
  }
  const PasscodeShowfunc = () => {
    if (!PasscodeShow) {
      CodeInp.current.type = "text"
      setPasscodeShow(true)
      setPasscodeIconClass("bi bi-eye-fill")
    } else {
      CodeInp.current.type = "password"
      setPasscodeShow(false)
      setPasscodeIconClass("bi bi-eye-slash-fill")
    }
  }
  const RandomCodefunc = () => {
    let value = ""
    for (let i = 0; i <= 7; i++) {
      const char = CodeGenerateArray[Math.round(Math.random() * CodeGenerateArray.length)]
      value += char
    }
    CodeInp.current.value = value
    CodeValuefunc()
  }
  const SubmitFunc = () => {
    dispatch(setQuizTitle(TitleInp?.current.value))
    dispatch(setPasscode(CodeInp?.current.value))
    dispatch(setNoOfQue(NoOfQueInp?.current.value))
    dispatch(setNoOfOpt(NoOfOptInp?.current.value))
    dispatch(setEachScore(EachScoreInp?.current.value))
    dispatch(setTimePro(TimeProInp?.current.value))
    dispatch(setQuiz({
      QuizID: 0,
      Title: TitleInp?.current.value,
      Passcode: CodeInp?.current.value,
      TotalQue: NoOfQueInp?.current.value,
      EachScore: EachScoreInp?.current.value,
      TimePro: TimeProInp?.current.value,
      Questions: [
        { Que: "", Options: ["", "", "", ""], CorrectOption: "" }
      ]
    }))
    navigate("/QuestionForm")
  }
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      SubmitFunc()
    }}>
      <div className='md:w-2/3 w-full absolute h-fit top-1/4 md-left-1-6 
     border-black border-2 bg-white flex flex-col  items-center p-5 sm:gap-3 gap-2'>
        <h1 className='sm:text-3xl text-2xl font-bold '>Create Your Quiz</h1>
        <p className={CodeStateColor}>{CodeState}</p>
        <div className='w-full   h-12 flex flex-row justify-center'>
          <input type="password" placeholder='Enter Quiz Passcode' className='w-10/12 border-gray-600 border-2 p-2 text-lg' onInput={() => { CodeValuefunc() }} ref={CodeInp} required />
          <button className='w-1/6 p-2 flex justify-center items-center border-gray-600 border-2 text-xl ' onClick={() => { PasscodeShowfunc() }}>
            <i className={PasscodeIconClass}></i>
          </button>
        </div>
        <p className='w-full text-left px-2 text-md'>Suggest Suitable code
          <button className='text-blue-500 underline px-2' onClick={() => { RandomCodefunc() }}> Click here </button>
        </p>
        <input type="text" placeholder='Enter Quiz Title' className='w-full border-gray-600 border-2 sm:p-2 p-1 h-12  sm:text-lg text-md ' ref={TitleInp} required onInput={(e) => {

        }} />
        <div className="flex flex-row justify-between w-full flex-wrap gap-4">
          <input type="number" placeholder='No of Questions' className='w-2/5 border-gray-600 border-2 sm:p-2 p-1 h-12  sm:text-lg text-md ' ref={NoOfQueInp} required min={0} max={50} />
          <input type="number" placeholder='No of Options' className='w-2/5 border-gray-600 border-2 sm:p-2 p-1 h-12 sm:text-lg text-md ' ref={NoOfOptInp} required min={2} max={6} />
          <input type="number" placeholder='Score on Each Question' className='w-2/5 border-gray-600 border-2 sm:p-2 p-1 h-12  sm:text-lg text-md' ref={EachScoreInp} required min={1} max={5} />
          <input type="number" placeholder='Time Provided ( in mins )' className='w-2/5 border-gray-600 border-2 sm:p-2 p-1 h-12  sm:text-lg text-md ' ref={TimeProInp} required />
        </div>
        <button className='w-2/5 border-gray-600 border-2 bg-blue-600 text-white h-10 text-lg font-bold' type='submit'>Save</button>
      </div>
      <UIpage></UIpage>
    </form>
  )
}


export default MakeQuizPage;
