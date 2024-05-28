import { child, get, ref } from 'firebase/database';
import React, { useContext, useRef, useState } from 'react'
import QuizAppContext from '../contexts/context'
import { useDispatch } from 'react-redux';
import { setQuiz } from '../reducers/QuizReducer';
import { setName, setQuizAddress } from "../reducers/StudentObjReducer"
import { useNavigate } from 'react-router-dom';
import UIpage from './UIpage';

const JoinQuizForm = () => {
    const context = useContext(QuizAppContext)
    const PasscodeInp = useRef(null)
    const NameInp = useRef(null)
    const [PasscodeShow, setPasscodeShow] = useState(false)
    const [PasscodeIconClass, setPasscodeIconClass] = useState("bi bi-eye-slash-fill")
    const [PasscodeState , setPasscodeState] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                            dispatch(setName(NameInp.current.value))
                            dispatch(setQuizAddress(`/users/${key}/User/Quizs/${QuizId}/Quiz/Students`))
                            navigate("/Quiz")
                        }else{
                            setPasscodeState("Please Enter Correct Passcode")
                        }
                    })

                })
            }
        })
    }
    return (
        <div className='w-full'>
        <div className='md:w-1/2  w-full p-3 flex flex-col items-center bg-white absolute top-1/4 md:left-1/4 gap-3 border-2 border-gray-500'>
            <h1 className='font-bold text-2xl'>Join Quiz</h1>
            <p className='text-md text-gray-500 font-bold'>Try Passcode "80808080" For Demo Quiz</p>
            <p className='font-semibold text-md text-red-800'>{PasscodeState}</p>
            <form className='w-full flex flex-col items-center gap-3 text-lg' onSubmit={(event) => {FormSubmitFunc(event)}}>
                <input type="text" placeholder='Enter Your Name' className='w-full h-12 border-gray-600 border-2 p-2' ref={NameInp} />
                <div className='w-full h-12 flex flex-row justify-center'>
                    <input type="password" placeholder='Enter Quiz Passcode' className='w-10/12 border-gray-600 border-2 p-2 text-lg' ref={PasscodeInp} required />
                    <button className='w-1/6 p-2 flex justify-center items-center border-gray-600 border-2 text-xl ' onClick={(event) => { PasscodeShowfunc(event) }}>
                        <i className={PasscodeIconClass}></i>
                    </button>
                </div>
                <button className='w-1/4 border-gray-600 border-2 bg-blue-600 text-white h-10 text-lg font-bold' type='submit'>Save</button>
            </form>
        </div>
        <UIpage></UIpage>
        </div>
    )
}

export default JoinQuizForm
