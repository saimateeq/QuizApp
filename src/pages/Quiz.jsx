import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateScore, setDateOfSub, setQueAns } from '../reducers/StudentObjReducer'
import { Link, Element } from "react-scroll"
import QuizAppContext from '../contexts/context'
import { useNavigate } from 'react-router-dom'
import { push, ref, set } from 'firebase/database'
import UIpage from './UIpage'
import '../App.css'

const Quiz = () => {
    const context = useContext(QuizAppContext)
    const QuizObj = useSelector(state => state.Quiz.value)
    const StudentObj = useSelector(state => state.StudentObj.value)
    const [QuizStart, setQuizStart] = useState(false)
    const [AnsArray, setAnsArray] = useState([])
    const [TimeLeft, setTimeLeft] = useState((QuizObj.TimePro * 60))
    const [QuizEnded, setQuizEnded] = useState(false)
    const [QuizEndState, setQuizEndState] = useState('')
    const [QuizEndClass, setQuizEndClass] = useState('')
    const CorrectAnsClass = ["flex flex-row gap-3 p-2 text-2xl bg-green-400 font-bold", 'w-full flex flex-col gap-3 border-4 border-y-green-500 p-2 bg-white opacity-80 ']
    const WrongAnsClass = ["flex flex-row gap-3 p-2 text-2xl bg-red-400 font-bold", 'w-full flex flex-col gap-3 border-4 border-y-red-500 p-2 bg-white opacity-80']
    const Minutes = Math.floor(TimeLeft / 60)
    const Seconds = TimeLeft % 60
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const AnswerFunc = (QueIndex, CorrectOpt, SelectedOption) => {
        dispatch(setQueAns(
            {
                Que: QuizObj.Questions[QueIndex].Que,
                Options: [...QuizObj.Questions[QueIndex].Options],
                CorrectOpt: CorrectOpt,
                SelectedOption: SelectedOption
            }))
        if (SelectedOption === CorrectOpt) {
            let array = [...AnsArray]
            array[QueIndex] = { SelectedOption: SelectedOption, Correct: true }
            setAnsArray([...array])
            dispatch(UpdateScore(StudentObj.Obj.YourScore + QuizObj.EachScore))
        } else {
            let array = [...AnsArray]
            array[QueIndex] = { SelectedOption: SelectedOption, Correct: false }
            setAnsArray([...array])
        }
    }
    const QuizStartFunc = () => {
        setQuizStart(true)
        const interval = setInterval(() => {
            const Time = new Date
            dispatch(setDateOfSub({
                Year : Time.getFullYear(),
                Month : Time.getMonth(),
                Day : Time.getDate(),
                Hour : Time.getHours(),
                Minutes : Time.getMinutes(),
                Seconds : Time.getSeconds()
            }))
            setTimeLeft(
                prevTime => {
                    if (prevTime === 0) {
                        SubmitFunc("TimeOut", "text-red-500")
                        clearInterval(interval)
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                })
        }, 1000);
    }
    const SubmitFunc = (State, Class) => {
        setQuizEndClass(Class)
        setQuizEndState(State)
        setQuizEnded(true)
        set(push(ref(context?.database, StudentObj.QuizAddress)), {
            Std: StudentObj.Obj
        });
    }
    return (
        <div>
        <div className='w-full m-auto flex flex-col  items-center mt-24'>
            <div className='sm:w-2/3 w-full m-auto p-3 flex flex-col bg-blue-200 items-center gap-5 border-2 border-black '>
                <h1 className='font-bold  sm:text-3xl text-2xl'>Quiz Title :- <span className='text-blue-600'>{QuizObj.Title}</span></h1>
                <div className='flex flex-row flex-wrap w-full justify-between sm:items-center text-center gap-3'>
                    <p className='font-bold md:text-lg text-md custom-w '>Student Name :- <span className='font-semibold text-gray-600 underline'>{StudentObj.Obj.Name}</span></p>
                    <p className='font-bold max-sm:flex max-sm:flex-col max-sm:items-center md:text-2x text-lg custom-w' >Time Left :- <span className='font-semibold text-gray-600 underline'>{Minutes} : {Seconds}</span></p>
                    <p className='font-bold md:text-lg text-md custom-w '>Total Score :- <span className='font-semibold text-gray-600 underline'>{QuizObj.EachScore * QuizObj.TotalQue}</span></p>
                    <p className='font-bold md:text-2x text-lg custom-w '>Your Score :- <span className='font-semibold text-gray-600 underline'>{StudentObj.Obj.YourScore}</span></p>
                </div>
            </div>
            <div className='flex justify-center bg-blue-200 z-10 sm:w-2/3 w-full p-2 '>
                {!QuizStart ?
                    <button className='bg-green-600 font-bold text-lg border-gray-500 border-2 text-white p-2 w-1/4' onClick={() => { QuizStartFunc() }}>Start</button>
                    :
                    <div className='w-full flex flex-col items-center gap-3 p-5'>
                        {QuizObj.Questions.map((value, QueIndex) => {
                            let Que = `Que${QueIndex + 1}`
                            let QueId = `Que${QueIndex}`
                            let CorrectOpt = value.CorrectOpt
                            return (
                                <div key={QueIndex} className={AnsArray[QueIndex]?.Correct ? CorrectAnsClass[1]
                                    : AnsArray[QueIndex]?.Correct === false ? WrongAnsClass[1]
                                        : 'w-full flex flex-col gap-3 border-2 border-y-black p-2 bg-white'}>
                                    <Element id={QueId}>
                                        <h1 className='font-bold text-lg'>Q{QueIndex + 1} :- <span className='font-semibold'>{value.Que}</span></h1>
                                        {value.Options.map((opt, index) => {
                                            let id = `Option${Que}${index + 1}`
                                            let option = `Option${index + 1}`
                                            return (
                                                <label htmlFor={id}>
                                                    <div className={AnsArray[QueIndex]?.SelectedOption === option ?
                                                        (AnsArray[QueIndex]?.Correct ? CorrectAnsClass[0] : WrongAnsClass[0])
                                                        : "flex flex-row gap-3 p-2 text-lg font-semibold"} >
                                                        <input type="radio" id={id} value={option} name={Que} disabled={AnsArray[QueIndex] === undefined ? false : true} onChange={() => { AnswerFunc(QueIndex, CorrectOpt, option) }} />
                                                        <p>{opt}</p>
                                                    </div>
                                                </label>
                                            )
                                        })}
                                    </Element>
                                    <Link activeClass='active' to={Que} spy={true} smooth={true} duration={500} offset={-183}><button className='bg-blue-600 text-lg border-gray-500 border-2 font-bold text-white p-3'>Next</button></Link>
                                </div>)
                        })}
                        <button className='bg-green-600 rounded-lg text-lg border-gray-500 border-2 font-bold text-white p-2 ' onClick={() => { SubmitFunc("Congratulations", "text-green-500") }}>Submit</button>
                    </div>
                }
            </div>
            <div className='w-full h-screen'>
                {QuizEnded ?
                <div className='w-full bg-black bg-opacity-60 h-screen fixed z-30'>
                    <div className='w-1/2 fixed top-1/4 left-1/4 gap-5 font-bold bg-black text-white p-5 flex flex-col  items-center'>
                        <h1 className={`font-bold sm:text-4xl text-2xl  ${QuizEndClass}`}>{QuizEndState}</h1>
                        <p className='sm:text-xl text-md'>Your Score : {StudentObj.Obj.YourScore}</p>
                        <button className='bg-blue-600 border-gray-500 border-2 sm:text-xl text:md text-white sm:py-2 sm:px-6 p-2' onClick={() => { navigate("/") }}>Go Back To Home</button>
                    </div>
                </div>
                    :
                    <div></div>}
            </div>

        </div >
        <UIpage></UIpage>
        </div>
    )
}

export default Quiz
