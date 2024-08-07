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
  const numbers = [...Array(20)].map((_, i) => i)
  const [value, setValue] = useState("")
  const [consecutiveNumber, setConsecutiveNumber] = useState(0)

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
    if (value === "") {
      alert("ひとつえらんでね！")
      return
    }

    if (Number(value) === determinedQuestion.answer) {
      alert("せいかいだよ！")
      setConsecutiveNumber((prev) => prev + 1)
    } else {
      alert(`はずれだよ！せいかいは${determinedQuestion.answer}`)
      setConsecutiveNumber(0)
    }
    setValue("")
    setDidSort(false)
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col p-8 h-full items-center">
        <p className="text-2xl">{determinedQuestion.description}</p>
        <Select value={value} onChange={handleChange} className="w-48 h-10 mt-4">
          {numbers.map((n) => (
            <MenuItem key={n} value={n} className="h-10 border border-b-gray-200 flex justify-center items-center">
              {n}
            </MenuItem>
          ))}
        </Select>

        <div style={{ marginBottom: 104 }} className="flex items-center justify-center flex-col mt-auto">
          <button
            onClick={handleClick}
            className="flex items-center justify-center rounded-lg border py-4 px-4 w-48 border-gray-200"
          >
            <p className="text-2xl font-semibold">こたえる</p>
          </button>
          <p className="text-right mt-4">れんぞく{consecutiveNumber}もん</p>
        </div>
      </div>
    </div>
  )
}

export default Component
