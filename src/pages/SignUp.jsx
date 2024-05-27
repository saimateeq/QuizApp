import React, { useContext, useRef, useState } from 'react'
import { setName, setEmail, setPassword } from '../reducers/userObjReduer'
import { useDispatch, useSelector } from 'react-redux'
import { child, get, ref, set, push } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import QuizAppContext from '../contexts/context'
import UIpage from './UIpage'

const SignUp = () => {
    const context = useContext(QuizAppContext)
    const NameInp = useRef(null)
    const EmailInp = useRef(null)
    const PasswordInp = useRef(null)
    const [PasswordShow, setPasswordShow] = useState(false)
    const [PasswordIconClass, setPasswordIconClass] = useState("bi bi-eye-slash-fill")
    const [SignUpState, setSignUpState] = useState("")
    const [QuizSaved, setQuizSaved] = useState(false)
    const [EmailTaken, setEmailTaken] = useState(false)
    const UserObj = useSelector(state => state.UserObj.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const PasswordShowfunc = () => {
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
        setEmailTaken(false)
        setSignUpState("")
        get(child(ref(context?.database), "users")).then((snapshot) => {
            if (snapshot.exists()) {
                let Users = snapshot.val()
                Object.keys(Users).forEach(key => {
                    let User = Users[key].User
                    let Email = User.Email
                    if (Email === EmailInp.current.value) {
                        setSignUpState("This Email is Already in Use")
                        setEmailTaken(true)
                    }
                }
                )
            }
        })
        if(!EmailTaken && PasswordInp.current.value){
            if(PasswordInp.current.value.length < 8){
                setSignUpState("Password Too Short")
            }
        }
    }
    const setFirebase = () => {
        if (SignUpState==="") {
            set(push(ref(context?.database, 'users/')), {
                User: {
                    Email: UserObj.Email,
                    Name: UserObj.Name,
                    Password: UserObj.Password,
                    Quizs: {
                        Quiz1: {
                            Quiz: UserObj.Quizs.Quiz
                        }
                    }
                }
            });
            setQuizSaved(true)
        }
    }
    return (
        <div className=''>
        <div className='md:w-1/2 w-full absolute top-1/4 md:left-1/4 left-0  p-3 text-lg border-2 border-gray-400 bg-white'>
            {!QuizSaved ?
                <div className='flex flex-col gap-3 items-center w-full'>
                    <h1 className='font-bold text-xl'>SignUp</h1>
                    <p className='text-red-800 font-bold text-md'>{SignUpState}</p>
                    <form onSubmit={()=>{setFirebase()}} className='flex flex-col w-full items-center gap-3'>
                    <input type="text" ref={NameInp} className='w-full border-2 border-black p-2' placeholder='Enter Your Name' required onChange={(event) => { dispatch(setName(event.target.value)) }} />
                    <input type="email" ref={EmailInp} className='w-full border-2 border-black p-2' placeholder='Enter Your Email' required onChange={(event) => {
                        CheckValue()
                        dispatch(setEmail(event.target.value))
                    }} />
                    <div className='w-full flex flex-row justify-center'>
                        <input type="password" placeholder='Enter Your Password' className='w-10/12 border-gray-600 border-2 p-2 text-lg' onChange={(event) => {
                            CheckValue()
                            dispatch(setPassword(event.target.value))
                        }} ref={PasswordInp} required/>
                        <button className='w-1/6 p-2 flex justify-center items-center border-gray-600 border-2 text-xl ' onClick={() => { PasswordShowfunc() }}>
                            <i className={PasswordIconClass}></i>
                        </button>
                    </div>
                    <p className='font-bold text-sm text-gray-500'>Or Already have an Account?<span className='text-blue-500 underline text-md p-3' onClick={() => { navigate("/Login") }}>Login</span></p>
                    <button type='submit' className='bg-blue-500 text-white p-3 font-bold text-lg border-2 border-gray-500 rounded-lg'>Sign Up</button>
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

export default SignUp
