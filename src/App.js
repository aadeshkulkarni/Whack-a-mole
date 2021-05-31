import { useState, useEffect } from "react"
import mole from "./mole.svg"
import reset from "./reset.svg"
import Sound from "react-sound"
import successSound from "./notification.mp3"
import ReactGA from "react-ga"

function App() {
  ReactGA.initialize("G-M81HVVHN6S")
  const COUNTDOWN_TIMER = 30
  const RESET_TIMER = 3000

  const [soundStatus, setSoundStatus] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(COUNTDOWN_TIMER)
  const [resetTimer, setResetTimer] = useState(RESET_TIMER)
  const [moleNumber, setMoleNumber] = useState()
  const [initial, setInitial] = useState(true)
  const [resetScreen, setResetScreen] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [name, setName] = useState("")
  function countDown() {
    setTimer(timer - 1)
  }

  let countdowntimerId

  function randomGenerator() {
    if (timer > 0) {
      const moleAtPosition = Math.ceil(Math.random() * 9)
      setMoleNumber(moleAtPosition)
    }
  }

  useEffect(() => {
    if (score != 0) {
      setSoundStatus(true)
    }
  }, [score])
  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(randomGenerator, 500)
      return () => clearInterval(id)
    }
  }, [timer])

  useEffect(() => {
    if (timer > 0) {
      countdowntimerId = setInterval(countDown, 1000)
      return () => clearInterval(countdowntimerId)
    }
    if (timer === 0) {
      const highScore = JSON.parse(localStorage.getItem("highScore"))
      if (score > highScore) {
        localStorage.setItem("highScore", score)
      }
      setShowResult(true)
    }
  }, [timer])

  const resetHandler = (e) => {
    ReactGA.event({
      category: "reset",
      action: "reset clicked",
      value: name,
    })
    setTimer(100)
    setResetScreen(true)
    countdowntimerId = setTimeout(() => {
      setResetScreen(false)
      setTimer(COUNTDOWN_TIMER)
      setScore(0)
      randomGenerator()
    }, RESET_TIMER)
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-r from-green-700 to-green-600 bg-opacity-20 font-raleway">
      {resetScreen && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-gray-800 h-hull">
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-black h-hull animate-pulse">
            <h1 className="text-xl text-white animate-ping">Get Ready</h1>
          </div>
        </div>
      )}
      <Sound
        url={successSound}
        ignoreMobileRestrictions={true}
        playStatus={soundStatus ? Sound.status.PLAYING : Sound.status.STOPPED}
        onLoading={() => console.log("Loading")}
        onPlaying={() => console.log("Playing now")}
        onFinishedPlaying={() => {
          setSoundStatus(false)
        }}
      />

      {/* {localStorage.getItem("highScore") && (
        <h1 className="p-2 text-2xl text-gray-800">
          Highest score: {localStorage.getItem("highScore")}
        </h1>
      )} */}
      <div className="absolute flex items-center justify-around w-11/12 top-5 lg:top-20">
        <h1 className="p-2 text-3xl text-gray-800"> Whack-A-Mole</h1>
      </div>
      <h1 className="p-2 text-2xl font-light text-gray-800">{name}</h1>

      <div className="flex items-center justify-between w-10/12 mb-12 lg:w-3/12 lg:m-12">
        <div classNam="flex flex-col">
          <h1 className="p-1 text-xl font-light text-gray-800 lg:text-3xl">
            Score:
          </h1>
          <h1 className="p-2 pt-0 text-xl text-center text-gray-800 lg:text-3xl">
            {score}
          </h1>
        </div>
        <img
          src={reset}
          className="w-10 h-10 rounded-full shadow-xl active:bg-opacity-50 lg:w-20 lg:h-20"
          onClick={(e) => {
            resetHandler(e)
          }}
        />
        <div classNam="flex flex-col">
          <h1 className="p-1 text-xl font-light text-gray-800 lg:text-3xl">
            Timer:{" "}
          </h1>
          <h1 className="p-2 pt-0 text-xl text-center text-gray-800 lg:text-3xl">
            {timer}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap p-2 mb-8 border-4 border-separate border-green-900 rounded-lg shadow-xl bg-gradient-to-r from-green-900 to-green-900 w-320 h-320">
        <div
          tabIndex="1"
          className={`${
            moleNumber === 1
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          }  bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer flex justify-center items-center rounded-full active:outline-none focus:outline-none focus-within:outline-none`}
          onFocus={() => console.log("Executed")}
          onClick={() => {
            timer > 0 && moleNumber === 1 && setScore(score + 50)
          }}
        >
          {moleNumber === 1 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 2
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          }  bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 2 && setScore(score + 50)
          }}
        >
          {moleNumber === 2 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 3
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 3 && setScore(score + 50)
          }}
        >
          {moleNumber === 3 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 4
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 4 && setScore(score + 50)
          }}
        >
          {moleNumber === 4 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 5
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 5 && setScore(score + 50)
          }}
        >
          {moleNumber === 5 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 6
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 6 && setScore(score + 50)
          }}
        >
          {moleNumber === 6 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 7
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 7 && setScore(score + 50)
          }}
        >
          {moleNumber === 7 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 8
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 8 && setScore(score + 50)
          }}
        >
          {moleNumber === 8 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
        <div
          className={`${
            moleNumber === 9
              ? "bg-gradient-to-r from-gray-900 to-black"
              : "bg-green-800"
          } bg-opacity-90 h-100 w-100 m-0.5 shadow-inner hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center rounded-full`}
          onClick={() => {
            timer > 0 && moleNumber === 9 && setScore(score + 50)
          }}
        >
          {moleNumber === 9 && (
            <img src={mole} className="w-16 h-16 animate-wiggle" />
          )}
        </div>
      </div>
      <h6
        className="absolute py-2 text-sm font-semibold bottom-2 hover:opacity-50 animate-pulse"
        onClick={(e) => {
          e.preventDefault()
          ReactGA.event({
            category: "portfolio",
            action: "Portfolio clicked",
            value: name,
          })
          window.location.href = "https://aadeshkulkarni.me/"
        }}
      >
        Designed with <span className="text-red-900">&hearts;</span> by Aadesh
        Kulkarni
      </h6>
      {showResult && (
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full bg-black h-hull">
          <h2 className="p-2 text-3xl text-white">Whack A Mole</h2>
          <img src={mole} className="w-24 h-24 m-6" />
          {localStorage.getItem("highScore") &&
            localStorage.getItem("highScore") !== "" && (
              <h2 className="p-2 text-2xl text-white">
                Highest score: {localStorage.getItem("highScore")}
              </h2>
            )}
          <h2 className="p-2 text-2xl text-white">Current score: {score}</h2>
          <button
            onClick={() => {
              ReactGA.event({
                category: "play",
                action: "Play again button clicked",
                value: name,
              })
              setTimer(COUNTDOWN_TIMER)
              setScore(0)
              randomGenerator()
              setShowResult(false)
            }}
            className="w-8/12 p-4 m-2 text-xl bg-white border border-gray-800 rounded-lg shadow-lg focus:outline-none active:outline-none active:bg-gray-50 md:w-4/12"
          >
            Play Again
          </button>
        </div>
      )}
      {initial && (
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full bg-black h-hull">
          <h2 className="p-2 text-3xl text-white">Whack A Mole</h2>
          <img src={mole} className="w-24 h-24 m-6" />
          <h3 className="p-2 text-xl text-white">Rules:</h3>
          <p className="w-7/12 p-3 text-base text-center text-white">
            Well, there are no rules! <br />
            Just Whack the mole <br />
            Whack it real bad!
          </p>
          <input
            autoFocus
            type="text"
            placeholder="Enter player name"
            value={name}
            maxLength="15"
            onChange={(e) => {
              setName(e.target.value)
            }}
            className="w-8/12 h-16 p-4 pb-2 m-2 font-semibold text-center rounded-lg shadow-lg text-md focus-within:outline-none md:w-4/12 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 focus:ring-inset"
          />
          <button
            onClick={(event) => {
              event.preventDefault()
              setInitial(false)
              setShowResult(false)
              setTimer(COUNTDOWN_TIMER)
              setScore(0)
              randomGenerator()
              ReactGA.event({
                category: "play",
                action: "Play button clicked",
                value: name,
              })
            }}
            disabled={name.trim() === ""}
            className={`w-8/12 p-4 m-2 text-xl text-white  border border-gray-800 rounded-lg shadow-lg bg-opacity-90 focus:outline-none active:outline-none active:bg-gray-50 md:w-4/12 ${
              name.trim() === ""
                ? "opacity-0 bg-gray-400"
                : "opacity-100 bg-green-500 animate-pulse"
            }`}
          >
            Play
          </button>
        </div>
      )}
    </div>
  )
}

export default App
