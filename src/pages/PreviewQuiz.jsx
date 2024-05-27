import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteQue, setEditingValue } from '../reducers/QueArrayReducer'
import { setEditVisibility }  from "../reducers/EditFormShow"
import EditForm from './EditForm'
import { useNavigate } from 'react-router-dom'
import UIpage from './UIpage'

const PreviewQuiz = () => {
    const [PageScrollClass,setPageScrollClass] = useState("w-full flex p-0 m-0 ")
    const Questions = useSelector(state => state.Questions.value)
    const EditFormShow = useSelector(state => state.EditFormShow.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const CorrectOptClass= "flex flex-row gap-3 p-2 bg-green-400 "
    useEffect(()=>{
        if(EditFormShow){
            setPageScrollClass("w-full flex justify-center p-0 m-0 fixed")
        }else{
            setPageScrollClass("w-full flex justify-center p-0 m-0")
        }
    })
    return (
        <div className={PageScrollClass}>
                <div className='w-full flex flex-col items-center gap-3 p-5 absolute top-1/4 bg-white'>
                    {Questions.map((value, QueIndex) => {
                        let Que = `Que${QueIndex + 1}`
                        let CorrectOpt = value.CorrectOpt
                        return (
                            <div className='w-full flex flex-col gap-3 border-2 border-y-black p-2'>
                                <h1 className='font-bold text-lg'>Q{QueIndex + 1} :- <span className='font-semibold'>{value.Que}</span></h1>
                                {value.Options.map((opt, index) => {
                                    let option = `Option${index + 1}`
                                    return (
                                        <div className={option === CorrectOpt ? CorrectOptClass : "flex flex-row gap-3 p-2 "}>
                                            <input type="radio" id={option} value={option} name={Que} checked={CorrectOpt === option} disabled={true} />
                                            <p className='font-semi-bold text-lg'>{opt}</p>
                                        </div>
                                    )
                                })}
                                <div className="flex flex-row justify-center items-center w-full gap-4 ">
                                    <button className='sm:w-1/5 bg-green-500 text-white font-bold p-2 sm:text-lg text-md rounded-lg' onClick={() => {
                                        dispatch(setEditingValue(QueIndex))
                                        dispatch(setEditVisibility(true))
                                        setPageScrollClass("w-full flex p-0 m-0 fixed")
                                    }}>Edit</button>
                                    <button className=' sm:w-1/5 bg-red-500 text-white font-bold p-2 sm:text-lg text-md rounded-lg' onClick={(QueIndex)=>{
                                        dispatch(DeleteQue(QueIndex))
                                    }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    }
                    <button className='bg-blue-500 sm:text-lg text-md font-bold text-white border-2 border-gray-500 rounded-lg sm:w-1/6 p-3' onClick={()=>{
                        navigate("/SignUp")
                    }}>Save</button>
                </div>
            {EditFormShow && <EditForm />}
            <UIpage></UIpage>
        </div>
    )
}

export default PreviewQuiz
