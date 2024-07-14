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
  { label: "ドラウンド", value: "doraundo" },
  { label: "ハスク", value: "hasuku" },
  { label: "ストレイ", value: "sutorei" },
  { label: "エヴォーカー", value: "evo-ka-" },
  { label: "ウォーデン", value: "ulo-den" },
  { label: "ヴェックス", value: "vekkusu" },
  { label: "ラヴェジャー", value: "ravejya-" },
  { label: "エンダーマン", value: "enda-man" },
  { label: "ファントム", value: "fantom" },
  { label: "ガーディアン", value: "ga-dhian" },
  { label: "エンダードラゴン", value: "enda-doragon" },
  { label: "ガスト", value: "gasuto" },
  { label: "マグマキューブ", value: "maguma-kyu-bu" },
  { label: "ピグリン", value: "pigurin" },
  { label: "ストライダー", value: "sutoraida-" },
  { label: "シュルカー", value: "syuruka-" },
  { label: "ウィザー", value: "uliza-" },
  { label: "ゾンビピグリン", value: "zonbi-pigurin" },
  { label: "ブタ", value: "buta" },
  { label: "ヒツジ", value: "hitsuji" },
  { label: "キツネ", value: "kitune" },
  { label: "ラクダ", value: "rakuda" },
  { label: "ウサギ", value: "usagi" },
  { label: "ヤギ", value: "yagi" },
  { label: "カメ", value: "kame" },
  { label: "オオカミ", value: "ookami" },
  { label: "パンダ", value: "panda" },
  { label: "シロクマ", value: "sirokuma" },
  { label: "フグ", value: "hugu" },
  { label: "イルカ", value: "iruka" },
  { label: "カエル", value: "kaeru" },
  { label: "コウモリ", value: "koumori" },
  { label: "ハチ", value: "mitubati" },
  { label: "サカナ", value: "sakana" },
  { label: "ウーパールーパー", value: "u-pa-ru-pa-" },
  { label: "アイアンゴーレム", value: "iron-golem" },
  { label: "スノウゴーレム", value: "snow-golem" },
  { label: "ウミ", value: "umi" },
  { label: "ユミ", value: "yumi" },
  { label: "シロ", value: "shiro" },
  { label: "ムラ", value: "mura" },
  { label: "ケン", value: "ken" },
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

const ModalContent = ({
  consecutiveNumber,
  isSelectedCorrect,
  onClickModal,
  previousCorrectChoiceValue,
}: {
  consecutiveNumber: number
  isSelectedCorrect: boolean
  onClickModal: () => void
  previousCorrectChoiceValue: string
}) => {
  if (consecutiveNumber === 50) {
    return (
      <div className="flex flex-col">
        <p className="text-white text-center text-4xl">だいせいかい！🎉</p>
        <Image
          src="/image/top.webp"
          alt="50 corrects!"
          width={400}
          height={300}
          className="mr-0 sm:mr-8 sm:mb-0 object-contain"
        />
        <p className="text-center text-4xl">🎉🎉🎉🎉🎉🎉🎉</p>
      </div>
    )
  }

  if (consecutiveNumber === 100) {
    return (
      <div className="flex flex-col">
        <p className="text-white text-center text-4xl">きみはとってもカタカナにくわしい！🎉</p>
        <Image
          src="/image/nigiyaka.webp"
          alt="100 corrects!"
          width={400}
          height={300}
          className="mr-0 sm:mr-8 sm:mb-0 object-contain"
        />
        <p className="text-center text-4xl">🎉🎉🎉🎉🎉🎉🎉</p>
        <p className="text-center text-4xl">🎉🎉🎉🎉🎉🎉🎉</p>
      </div>
    )
  }

  if (isSelectedCorrect) {
    return (
      <button
        onClick={onClickModal}
        className="inline-block w-48 h-48 sm:w-96 sm:h-96 leading-10 rounded-full border-solid border-sky-500"
        style={{ borderWidth: 40 }}
      />
    )
  }

  return (
    <button onClick={onClickModal}>
      <CloseIcon
        sx={{
          fontSize: 300,
          color: "rgb(239 68 68)",
        }}
      />
      <p>せいかいは...</p>
      <p className="text-4xl">{previousCorrectChoiceValue}</p>
    </button>
  )
}

const Component = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [didShuffle, setDidShuffle] = useState(false)
  const [choices, setChoices] = useState<Choice[]>(Array(3).fill({ label: "", value: "" }))
  const [correctChoice, setCorrectChoice] = useState({ label: "", value: "" })
  const [previousCorrectChoiceValue, setPreviousCorrectChoiceValue] = useState("")
  const [isSelectedCorrect, setIsSelectedCorrect] = useState(false)
  const [consecutiveNumber, setConsecutiveNumber] = useState(0)

  const onClickButton = (isCorrect: boolean) => {
    setModalOpen(true)
    setIsSelectedCorrect(isCorrect)
    if (isCorrect) {
      setConsecutiveNumber((prev) => prev + 1)
    } else {
      setConsecutiveNumber(0)
      setPreviousCorrectChoiceValue(correctChoice.label)
    }
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

  const shouldBeSmall =
    correctChoice.value === "steve" ||
    correctChoice.value === "alex" ||
    correctChoice.value === "iron-golem" ||
    correctChoice.value === "snow-golem"

  return (
    <>
      {!modalOpen && (
        <div className="h-screen px-8">
          <div className="flex flex-col items-center justify-center mt-4 h-full">
            <div className="relative overflow-hidden flex justify-center items-center" style={{ width: "40%" }}>
              {correctChoice.value && (
                <Image
                  src={`/image/${correctChoice.value}.webp`}
                  alt={correctChoice.value}
                  priority
                  width={shouldBeSmall ? 100 : 300}
                  height={400}
                  className="mr-0 sm:mr-8 sm:mb-0 object-contain"
                />
              )}
            </div>
            <div className="w-full flex flex-col gap-y-3 mt-4">
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
            <div className="mt-auto items-end w-full">
              <p className="mb-36 text-right">れんぞく{consecutiveNumber}もん</p>
            </div>
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
        <ModalContent
          consecutiveNumber={consecutiveNumber}
          isSelectedCorrect={isSelectedCorrect}
          onClickModal={onClickModal}
          previousCorrectChoiceValue={previousCorrectChoiceValue}
        />
      </Modal>
    </>
  )
}

export default Component
