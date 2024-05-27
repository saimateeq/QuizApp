import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions } from '../reducers/QueArrayReducer'
import { useNavigate } from 'react-router-dom'
import { setQue } from '../reducers/userObjReduer'
import UIpage from './UIpage'
const QuestionForm = () => {
  const QuizTitle = useSelector(state => state.quiztitle.value)
  const NoOfQue = useSelector(state => state.NoOfQue.value)
  const NoOfOpt = useSelector(state => state.NoOfOpt.value)
  const [QueArray, setQueArray] = useState([{Que : "" , Options : [] , CorrectOpt : ""}])
  const [QueNo, setQueNo] = useState(1)
  const QueInp = useRef(null)
  const OptionsInp = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const [Options, setOptions] = useState([]);
  const [CorrectOpt, setCorrectOpt] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const OptConstruct = () => {
    setOptions([])
    for (let i = 1; i <= NoOfOpt; i++) {
      let object = { id: i, ref: OptionsInp[i], value: "" }
      setOptions(prevArray => {
        return [...prevArray, object]
      })
    }
  }
  useEffect(() => {
    return (
      OptConstruct()
    )
  }, [])
  const QueChange = () => {
    let Array = [...QueArray]
    Array[QueNo - 1].Que = QueInp.current.value
    setQueArray(Array)
  }
  const QueFunc = (event) => {
    event.preventDefault()
    { QueNo < NoOfQue ? setQueArray([...QueArray, { Que: "", Options: [], CorrectOpt: "" , EditingValue: false}]) : dispatch(setQuestions(QueArray)) 
    dispatch(setQue(QueArray))  }
    setQueNo(QueNo + 1)
      QueInp.current.value = ""
    Options.forEach(element => { element.ref.current.value = "" })
    setCorrectOpt(null)
  }
  return (
    <div className='md:2/3 w-full '>
    <div className='w-full h-fit border-black border-2 mx-auto absolute top-1/4 bg-white p-3'>
        <form className='flex flex-col gap-3 justify-center items-center w-full' onSubmit={(event) => QueFunc(event)}>
          <h1 className='text-4xl font-extrabold'>Question Form</h1>
          <h1 className='text-3xl font-bold'>Quiz Title : <span className='text-sky-700 font-serif'>{QuizTitle}</span></h1>
      {QueNo <= NoOfQue ?
      <div className='flex flex-col gap-3 justify-center items-center'>
          <h2 className='text-2xl font-semibold mr-auto '>Question No : <span className='text-indigo-600'>{QueNo}</span></h2>
          <input type="text" placeholder='Enter Question' ref={QueInp} onChange={() => {
            QueChange()
          }} className='w-4/5 border-2 border-gray-500 p-1 text-lg' required />
          <div className='w-4/5 flex flex-row flex-wrap justify-between gap-3'>
            {Options.map((value, index) => {
              const opt = `Option${index + 1}`
              const Optionfunc = (event) => {
                let Array = [...QueArray]
                Array[QueNo - 1].Options[index] = event.target.value
                setQueArray(Array)
              }
              const CorrectOptChange = () => {
                setCorrectOpt(opt)
                let Array = [...QueArray]
                Array[QueNo - 1].CorrectOpt = opt
                setQueArray(Array)
              }
              return (
                <div key={index} className='w-5/12 flex flex-row justify-evenly items-center'>
                  <input type="radio" id={opt} name='option' value={opt} required checked={CorrectOpt === opt} onChange={() => { CorrectOptChange() }} />
                  <input type="text" placeholder={opt} key={index} className='w-4/5 border-gray-500 border-2 p-1 text-lg' onChange={(event) => { Optionfunc(event) }} required ref={value.ref} />
                </div>
              )
            })}
          </div>
          <button className='w-1/4 bg-blue-600 border-gray-600 border-2 text-white font-bold text-xl p-2' type='submit'>Next</button>
          </div>
          :
          <button className='bg-blue-500 text-white font-bold p-2 text-lg rounded-xl m-auto ' onClick={() => { navigate("/PreviewQuiz") }}>Preview Your Quiz</button>
        }
        </form>
    </div>
        <UIpage></UIpage>
    </div>
  )
}
export default QuestionForm
