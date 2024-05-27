import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditVisibility } from '../reducers/EditFormShow'
import { setEditQue } from '../reducers/QueArrayReducer'
import { setEditQuestion } from '../reducers/userObjReduer'

const EditForm = () => {
    const Questions = useSelector(state => state.Questions.value)
    const [QueInp, setQueInp] = useState("")
    const [EditedObj,setEditedObj] = useState({
        EditedQue: {},
        EditingIndex: -1,
    })
    const [OptionInp, setOptionInp] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        Questions.map((value, index) => {
            if (value.EditingValue) {
                let obj = {...EditedObj}
             obj.EditedQue.Que = value.Que
             obj.EditedQue.Options = value.Options
             obj.EditedQue.CorrectOpt = value.CorrectOpt
            setEditedObj({...EditedObj,EditedQue : {...obj} })
                setOptionInp([...value.Options])
                setQueInp(value.Que)
                setEditedObj({...EditedObj,EditingIndex : index})
            }
        })
    }, [])
    const OptionFunc = (index, event) => {
        let Array = [...OptionInp]
        Array[index] = event.target.value
        setOptionInp([...Array])
        let obj = {...EditedObj}
        obj.EditedQue.Options = [...Array]
        setEditedObj({ ...obj})
    }
    return (
        <div className='absolute w-full h-screen bg-black-blur p-0 m-0'>
            <div className='flex flex-col items-center p-3 gap-3 w-1/2 h-auto top-1/4 left-1/4 bg-white absolute' >
                <h1 className='w-full text-center font-bold text-2xl'>Edit Form <span>
                    <i className="bi bi-x-circle float-right text-3xl p-3" onClick={() => { dispatch(setEditVisibility(false)) }}></i></span></h1>
                <input className='w-4/5 border-2 border-black p-2 text-lg' type="text" placeholder='Enter Edited Question' value={QueInp} onChange={(event) => {
                    setQueInp(event.target.value)
                    let obj = {...EditedObj}
                    obj.EditedQue.Que = event.target.value
                    setEditedObj({ ...obj})
                }} />
                <h1 className='font-semibold text-xl'>Options</h1>
                <div className='w-4/5 flex flex-row justify-between gap-3 flex-wrap '>
                    {OptionInp.map((value, index) => {
                        let opt = `Option${index + 1}`
                        return (
                            <div className='w-2/5 flex flex-row gap-2'>
                                <input type='radio'id={opt} value={opt} checked={opt === EditedObj.EditedQue.CorrectOpt} onChange={(event)=>{
                                    let obj = {...EditedObj.EditedQue}
                                    obj.CorrectOpt=event.target.value
                                    setEditedObj({...EditedObj,EditedQue:{...obj}})
                                }}/>
                                <input className='w-4/5 text-lg p-2 border-2 border-black' type="text" placeholder={opt} value={OptionInp[index]} onChange={(event) => { OptionFunc(index, event) }} />
                            </div>
                        )
                    })}
                </div>
                <button className='w-1/4 text-xl text-white font-semibold p-3 bg-blue-600 border-gray-500 rounded-lg' onClick={() => {
                    dispatch(setEditQue(EditedObj))
                    dispatch(setEditVisibility(false))
                    dispatch(setEditQuestion(EditedObj))
                }}>Save</button>
            </div>
        </div>
    )
}

export default EditForm
