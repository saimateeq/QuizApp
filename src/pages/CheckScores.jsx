import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UIpage from './UIpage'
import "../App.css"

const CheckScores = () => {
  const Quiz = useSelector(state => state.Quiz.value)
  const Student = Quiz.Students
  const [TableArray, setTableArray] = useState([])
  const ShowDetailsFunc = (index) => {
    setTableArray(prevArray =>{
      for (let i = index + 1 ; i <= index + Quiz.TotalQue + 1;i++){
          prevArray[i].show = true
      }
      return [...prevArray]
    })
  }
  const ShowLessFunc = (index) => {
    setTableArray(prevArray =>{
      for (let i = index + 1 ; i <= index + Quiz.TotalQue + 1;i++){
          prevArray[i].show = false
      }
      return [...prevArray]
      })
  }
  useEffect(() => {
      Object.values(Student).forEach(value => {
        setTableArray(prevArray => [...prevArray, { values: [value.Std.Name, Quiz.TotalQue, value.Std.NoOfCorrectAns, value.Std.YourScore, "Show Detail"], type: "Std Details", show: true },
        { values: ["Question No", "Question", "Correct Answer", "Student's Answer", "Points"], type: "Heading", show: false }])
        value.Std.QueAns.map((question, index) => {
          setTableArray(prevArray => [...prevArray, { values: [index + 1, question.Que, question.CorrectOpt, question.SelectedOption, value.CorrectOpt === value.SelectedOption ? 2 : 0], type: "Que Details", show: false }])
        })
      })
    }, [])
    return (
      <div>
      <div className='w-4/5 max-md:w-full  bg-white absolute top-1/4 left-custom flex flex-col items-center m-auto gap-4 border-black border-2 p-5'>
      <h1 className='text-4xl font-extrabold'>Quiz Scores</h1>
      <h1 className='text-3xl font-bold'>Quiz Title : <span className='text-sky-700 font-serif'>{Quiz.Title}</span></h1>
      <table className=''>
        <thead><tr>
          <th className='md:px-3 px-1 border-2 border-black bg-blue-200'>Student Name</th>
          <th className='md:px-3 px-1 border-2 border-black bg-blue-200'>Total Questions</th>
          <th className='md:px-3 px-1 border-2 border-black bg-blue-200'>Correct Answers</th>
          <th className='md:px-3 px-1 border-2 border-black bg-blue-200'>Student Score</th>
        </tr></thead>
        <tbody>
          {TableArray.map((value, index) => {
            let condition = index / TableArray.length   
            return (
              <tr className={`${condition < 0.5 ? "" : "hidden"} text-center font-semibold text-lg   `}>
                {value.values.map((cell, cellIndex) => {
                  return (
                    <td className= {` ${value.type === "Std Details" ? "bg-gray-400 " : value.type === "Heading" ? "bg-gray-300" : "" } ${value.show ? "" : "hidden"} border-2 border-black px-3 py-2`}>
                      {value.type === "Std Details" && cellIndex === 4 ? <button onClick={()=>{
                        {TableArray[index + 1].show ? ShowLessFunc(index) : ShowDetailsFunc(index)}
                      }} className='bg-blue-300 font-bold p-2 rounded-lg border-2 border-black' >
                        {TableArray[index + 1].show ? "Show Less" : "Show Details"}</button> : <div>{cell}</div>}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    <UIpage></UIpage>
      </div>
  )
}

export default CheckScores
