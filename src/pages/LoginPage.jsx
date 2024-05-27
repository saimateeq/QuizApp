import React, { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { child, get, ref, push, set } from 'firebase/database'
import QuizAppContext from '../contexts/context'
import { useNavigate } from 'react-router-dom'
import UIpage from './UIpage'

const Login = () => {
    const context = useContext(QuizAppContext)
    const EmailInp = useRef(null)
    const PasswordInp = useRef(null)
    const [PasswordShow, setPasswordShow] = useState(false)
    const [PasswordIconClass, setPasswordIconClass] = useState("bi bi-eye-slash-fill")
    const [LoginState, setLoginState] = useState("")
    const [UserFound, setUserFound] = useState(false)
    const [PasswordMatch, setPasswordMatch] = useState(false)
    const [UserKey, setUserKey] = useState("")
    const [QuizSaved, setQuizSaved] = useState(false)
    const UserObj = useSelector(state => state.UserObj.value)
    const navigate = useNavigate()
    const PasswordShowfunc = (event) => {
        event.preventDefault()
        if (!PasswordShow) {
            PasswordInp.current.type = "text"
            setPasswordShow(true)
            setPasswordIconClass("bi bi-eye-fill")
        } else {
            PasswordInp.current.type = "password"
            setPasswordShow(false)
            setPasswordIconClass("bi bi-eye-slash-fill")
        }
    }
    const CheckValue = () => {
        setPasswordMatch(false)
        setUserFound(false)
        get(child(ref(context?.database), "users")).then((snapshot) => {
            if (snapshot.exists()) {
                let Users = snapshot.val()
                Object.keys(Users).forEach(key => {
                    let ID = Users[key].User
                    let Email = ID.Email
                    let Password = ID.Password
                    console.log(Email);
                    if (Email === EmailInp.current.value) {
                        setUserFound(true)
                        if (PasswordInp.current.value) {
                            if (PasswordInp.current.value === Password) {
                                setPasswordMatch(true)
                                setUserKey(key)
                            }
                        }
                    }
                })
            }
        })
    }
    const setFirebase = (event) => {
        event.preventDefault()
        if (UserFound && PasswordMatch) {
            setLoginState("")
            setQuizSaved(true)
            set(push(ref(context?.database, `users/${UserKey}/User/Quizs`)), {
                Quiz: UserObj.Quizs.Quiz
            });
        } else if (!UserFound) { setLoginState("User Not Found") }
        else if (!PasswordMatch) { setLoginState("Incorrect Password") }
    }
    return (
        <div>
        <div className='md:w-1/2 w-full flex absolute top-1/4 md:left-1/4 flex-col p-3 gap-3 text-lg items-center border-2 border-gray-400 bg-white'>
            <h1 className='font-bold text-2xl'>Login</h1>
            {!QuizSaved ?
                <div className='w-full '>
                    <p className='text-red-800 font-bold text-md'>{LoginState}</p>
                    <form onSubmit={(event) => { setFirebase(event) }} className='flex flex-col gap-3 items-center w-full '>
                        <input type="email" ref={EmailInp} className='w-full border-2 border-black p-2' placeholder='Enter Your Email' required onInput={(event) => {
                            CheckValue()
                        }} />
                        <div className='w-full flex flex-row justify-center'>
                            <input type="password" placeholder='Enter Your Password' className='w-10/12 border-gray-600 border-2 p-2 text-lg' onInput={(event) => {
                                CheckValue()
                            }} ref={PasswordInp} required />
                            <button className='w-1/6 p-2 flex justify-center items-center border-gray-600 border-2 text-xl ' onClick={(event) => { PasswordShowfunc(event) }}>
                                <i className={PasswordIconClass}></i>
                            </button>
                        </div>
                        <button type='submit' className='bg-blue-500 text-white  p-3 font-bold text-lg border-2 border-gray-500 rounded-lg'>Login</button>
                    </form>
                </div>
                :
                <div className='w-full flex flex-col items-center gap-5 font-bold'>
                    <h1 className='text-2xl '>Thankyou For Visting</h1>
                    <h1 className='text-xl text-green-500'>Your Quiz Has Been Saved <i className="bi bi-check-circle-fill"></i> </h1>
                    <button className='bg-blue-600 border-gray-500 border-2 text-white py-2 px-6' onClick={() => { navigate("/") }}>Go Back To Home</button>
                </div>
            }
        </div>
        <UIpage></UIpage>
        </div>
    )
}
export default Login
