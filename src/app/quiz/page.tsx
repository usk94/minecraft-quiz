"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

type Choice = {
  label: string
  value: string
}

const allChoices = [
  { label: "スティーブ", value: "steve" },
  { label: "ムラビト", value: "murabito" },
  { label: "アレックス", value: "alex" },
  { label: "クリーパー", value: "kuripa" },
  { label: "クモ", value: "kumo" },
  { label: "スケルトン", value: "sukeruton" },
  { label: "スライム", value: "suraimu" },
  { label: "ウィッチ", value: "witch" },
  { label: "ブタ", value: "buta" },
  { label: "ヒツジ", value: "hitsuji" },
  { label: "キツネ", value: "kitune" },
  { label: "ラクダ", value: "rakuda" },
  { label: "ウサギ", value: "usagi" },
  { label: "ヤギ", value: "yagi" },
]

const uniqueChoices = (array: Choice[], num: number): Choice[] => {
  const shuffledArray = [...array].sort(() => Math.random() - 0.5)
  const chosenChoices: Choice[] = []

  for (let i = 0; i < shuffledArray.length && chosenChoices.length < num; i++) {
    const currentChoice = shuffledArray[i]
    const isDuplicated = chosenChoices.filter((choice) => choice.label === currentChoice.label).length
    if (!isDuplicated) {
      chosenChoices.push(currentChoice)
    }
  }

  return chosenChoices
}

const Component = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [didShuffle, setDidShuffle] = useState(false)
  const [choices, setChoices] = useState<Choice[]>(Array(3).fill({ label: "", value: "" }))
  const [correctChoice, setCorrectChoice] = useState({ label: "", value: "" })
  const [isSelectedCorrect, setIsSelectedCorrect] = useState(false)
  const onClickButton = (isCorrect: boolean) => {
    setModalOpen(true)
    setIsSelectedCorrect(isCorrect)
    setDidShuffle(false)
  }
  const onClickModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (!didShuffle) {
      const uc = uniqueChoices(allChoices, 3)
      setChoices(uc)
      setCorrectChoice(uc[Math.floor(Math.random() * uc.length)])
      setDidShuffle(true)
    }
  }, [didShuffle])

  const isSteveOrAlex = correctChoice.value === "steve" || correctChoice.value === "alex"

  return (
    <>
      {!modalOpen && (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="relative overflow-hidden flex justify-center items-center" style={{ width: "40%" }}>
            {correctChoice.value && (
              <Image
                src={`/image/${correctChoice.value}.webp`}
                alt={correctChoice.value}
                priority
                width={isSteveOrAlex ? 100 : 300}
                height={400}
                className="mr-0 sm:mr-8 sm:mb-0 object-contain"
                loading="eager"
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-y-3 px-8 mt-4">
            {choices.map((choice) => {
              if (!choice.label) return null

              return (
                <button
                  key={choice.label}
                  onClick={() => onClickButton(choice.value === correctChoice.value)}
                  className="flex items-center justify-center rounded-lg border py-4 px-4 border-gray-200 gap-y-4"
                >
                  <p className="text-2xl font-semibold">{choice.label}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}
      <Modal
        open={modalOpen}
        onClose={onClickModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        {isSelectedCorrect ? (
          <button
            onClick={onClickModal}
            className="inline-block w-48 h-48 sm:w-96 sm:h-96 leading-10 rounded-full border-solid border-sky-500"
            style={{ borderWidth: 40 }}
          />
        ) : (
          <button onClick={onClickModal}>
            <CloseIcon
              sx={{
                fontSize: 300,
                color: "rgb(239 68 68)",
              }}
            />
            <p>せいかいは...</p>
            <p className="text-4xl">{correctChoice.label}</p>
          </button>
        )}
      </Modal>
    </>
  )
}

export default Component
