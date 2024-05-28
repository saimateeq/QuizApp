import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { child, get, ref } from 'firebase/database'
import QuizAppContext from '../contexts/context'
import { useDispatch } from 'react-redux'
import { setQuiz } from '../reducers/QuizReducer'

const WelcomePage = () => {
    const context = useContext(QuizAppContext)
    const [QuizAppH, setQuizAppH] = useState("")
    const [headingAniClass, setheadingAniClass] = useState("")
    const [BtnAni, setBtnAni] = useState("hidden")
    const [FormVisible , setFormVisible] = useState(false)
    const [PasscodeShow, setPasscodeShow] = useState(false)
    const [PasscodeIconClass, setPasscodeIconClass] = useState("bi bi-eye-slash-fill")
    const [PasscodeState , setPasscodeState] = useState("")
    const PasscodeInp = useRef(null)
    const start = 'Quiz App'
    const HeadingClass = `w-full h-1/6 absolute text-center top5-12 flex justify-center ${headingAniClass}`
    const FirstBtnClass = `w-1/2 bg-yellow-600 rounded-xl p-2 translate-y-96 justify-center ${BtnAni}`
    const AllBtnClass = `w-1/2 bg-blue-600 rounded-xl p-2 translate-y-96 justify-center ${BtnAni}`
    const navigate = useNavigate()
    const dispatch = useDispatch()
    setTimeout(() => {
        setheadingAniClass("headingAni")
    }, 3000)
    setTimeout(() => {
        setBtnAni("BtnsShow")
    }, 3000);
    const QuizEffectFunc = () => {
        let words = 0
        const QuizEffect = () => {
            if (QuizAppH !== start) {
                let text = start.substring(0, words)
                setQuizAppH(text)
                words++
            } else {
                clearInterval(interval);
            }
        }
        const interval = setInterval(QuizEffect, 200)
    }
    const PasscodeShowfunc = (event) => {
        event.preventDefault()
        if (!PasscodeShow) {
            PasscodeInp.current.type = "text"
            setPasscodeShow(true)
            setPasscodeIconClass("bi bi-eye-fill")
        } else {
            PasscodeInp.current.type = "password"
            setPasscodeShow(false)
            setPasscodeIconClass("bi bi-eye-slash-fill")
        }
    }
    const FormSubmitFunc = (event) => {
        event.preventDefault()
        get (child(ref(context?.database), "users")).then((snapshot) => {
            if (snapshot.exists()) {
                let Users = snapshot.val()
                Object.keys(Users).forEach(key => {
                    let Quizs = Users[key].User.Quizs
                    Object.keys(Quizs).forEach(QuizId => {
                        let Passcode = Quizs[QuizId].Quiz.Passcode
                        if(PasscodeInp.current.value === Passcode){
                            dispatch(setQuiz(Quizs[QuizId].Quiz))
                            navigate("/CheckScores")
                        }else{
                            setPasscodeState("Please Enter Correct Passcode")
                        }
                    })

                })
            }
        })
    }
    useEffect(() => {
        QuizEffectFunc()
    }, [])
    return (
        <div className='cantainer bg-gray-800 w-full h-screen pt-28 '>
            <div className={HeadingClass}>
                <h1 className="font-bold MainH w-fit">{QuizAppH}</h1>
            </div>
            <div className="container flex-col m-auto text-white sm:text-2xl text-lg items-center font-bold gap-7 h-4/5 flex overflow-hidden ">
                <button className={FirstBtnClass} onClick={()=>{navigate("/JoinQuizForm")}}>Join Quiz</button>
                <button className={AllBtnClass} onClick={()=>{navigate("/makequiz")}}>Make Your Quiz</button>
                <button className={AllBtnClass} onClick={()=>{ setFormVisible(true)}}>Check Scores</button>
            </div>
            {FormVisible ? 
            <div className='w-full flex items-center fixed top-0 left-0 h-screen bg-black bg-opacity-60 z-30 '>
                <form onSubmit={(event)=>{ FormSubmitFunc(event) }} className='sm:w-1/3 w-full m-auto bg-white flex flex-col items-center p-5 gap-4 max-md:gap-2'>
                <h1 className='w-full text-center md:text-2xl text-xl font-bold'>Check Scores<span>
                    <i className="bi bi-x-circle float-right md:text-3xl text-2xl" onClick={() => { setFormVisible(false) }}></i></span></h1>
                <p className='text-sm w-full text-center text-gray-500 font-bold'>Try Passcode "80808080" For Demo Quiz</p>
                    <p className='font-semibold text-md text-red-800'>{PasscodeState}</p>
                <div className='w-full md:h-12  flex flex-row justify-center'>
                    <input type="password" placeholder='Enter Passcode' className='w-10/12 border-gray-600 border-2 p-2 md:text-lg text-md' onInput={()=>{setPasscodeState("")}} ref={PasscodeInp} required />
                    <button className='w-1/6 p-2 flex justify-center items-center border-gray-600 border-2 md:text-xl text-lg ' onClick={(event) => { PasscodeShowfunc(event) }}>
                        <i className={PasscodeIconClass}></i>
                    </button>
                </div>
                <button className='p-2 border-gray-600 border-2 bg-blue-600 text-white text-lg font-bold' type='submit'>Next</button>
                </form>
            </div>
            : <div></div>
        }
        </div>
    )
}
export default WelcomePage
