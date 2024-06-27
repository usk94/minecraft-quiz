"use client"

import { useState } from "react"
import "./home.css"
import Link from "next/link"
import Image from "next/image"

const Component = () => {
  return (
    <>
      <div>
        <article
          id="creeper"
          role="img"
          aria-label="Animated drawing of a Creeper from Minecraft. A monster made out of boxes"
        >
          <header>
            <h1>MineCraft Creeper in CSS</h1>
          </header>
          <main>
            <p>This is a test of a 3D drawing in CSS</p>
          </main>
          <footer>
            <div className="foot">
              <p>Youll need CSS to view this drawing.</p>
            </div>
            <div className="foot">
              <p>This is a test.</p>
            </div>
            <div className="foot">
              <p>Some other test :P.</p>
            </div>
            <div className="foot">
              <p>CSS drawing created by Alvaro Montoro.</p>
            </div>
          </footer>
        </article>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 120,
          transform: "translateX(-50%)",
          width: 300,
        }}
      >
        <Link
          href="quiz"
          className="flex items-center justify-center rounded-lg border py-4 mx-4 border-gray-200 gap-y-4"
        >
          <p className="text-2xl font-semibold">カタカナクイズ</p>
        </Link>
        <Link
          href="quiz"
          className="flex items-center justify-center rounded-lg border py-4 mx-4 mt-4 border-gray-200 gap-y-4"
        >
          <p className="text-2xl font-semibold">さんすう</p>
        </Link>
      </div>
    </>
  )
}

export default Component
