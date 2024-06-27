"use client"
import { useEffect, useState } from "react"
import questions from "../question.json"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"

const Component = () => {
  const [didSort, setDidSort] = useState(false)
  const [determinedQuestion, setDeterminedQuestion] = useState<{ description: string; answer: number }>({
    description: "",
    answer: 0,
  })
  const numbers = [...Array(10)].map((_, i) => i)
  const [value, setValue] = useState("")

  useEffect(() => {
    if (!didSort) {
      const sortedQuestions = questions.sort(() => Math.random() - 0.5)
      setDeterminedQuestion(sortedQuestions[0])
      setDidSort(true)
    }
  }, [didSort])
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    if (Number(value) === determinedQuestion.answer) {
      alert("正解だよ！")
    } else {
      alert("はずれだよ！")
    }
    setValue("")
    setDidSort(false)
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col h-full">
        <p className="text-2xl">{determinedQuestion.description}</p>
        <Select value={value} onChange={handleChange} className="w-20 h-10">
          {numbers.map((n) => (
            <MenuItem key={n} value={n} className="h-10 border border-b-gray-200 flex justify-center items-center">
              {n}
            </MenuItem>
          ))}
        </Select>

        <button
          onClick={handleClick}
          style={{ marginBottom: 120 }}
          className="flex items-center justify-center rounded-lg border py-4 px-4 border-gray-200 mt-auto"
        >
          <p className="text-2xl font-semibold">こたえる</p>
        </button>
      </div>
    </div>
  )
}

export default Component
