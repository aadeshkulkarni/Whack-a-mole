import { useState, useEffect } from "react"
// import mole from "./bug-sharp.svg"
import mole from "./mole.svg"
import reset from "./reset.svg"
import Sound from "react-sound"
import successSound from "./notification.mp3"

function App() {
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
  function countDown() {
    setTimer(timer - 1)
  }

  let countdowntimerId

  function randomGenerator() {
    const moleAtPosition = Math.ceil(Math.random() * 9)
    setMoleNumber(moleAtPosition)
  }

  useEffect(() => {
    if (score != 0) {
      setSoundStatus(true)
    }
  }, [score])
  useEffect(() => {
    if (timer > 0) {
      console.log("UseEffect 1")
      const id = setInterval(randomGenerator, 500)
      return () => clearInterval(id)
    }
  }, [moleNumber])

  useEffect(() => {
    if (timer > 0) {
      console.log("UseEffect 2")
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

  const resetHandler = () => {
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
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-green-500 bg-opacity-90 font-raleway">
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

      <img
        src={reset}
        className="w-12 h-12 rounded-full shadow-xl"
        onClick={() => {
          resetHandler()
        }}
      />
      {localStorage.getItem("highScore") && (
        <h1 className="p-2 text-2xl text-gray-800">
          Highest score: {localStorage.getItem("highScore")}
        </h1>
      )}
      <h1 className="p-2 text-2xl text-gray-800">Score: {score}</h1>
      <h1 className="p-2 text-3xl text-gray-800 uppercase"> Whack A Mole</h1>
      <h2 className="p-2 text-2xl text-gray-800">Time Left: {timer}</h2>
      <div className="flex flex-wrap p-1 bg-green-700 rounded-sm shadow-xl w-320 h-320">
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 1 && setScore(score + 50)
          }}
        >
          {moleNumber === 1 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 2 && setScore(score + 50)
          }}
        >
          {moleNumber === 2 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 3 && setScore(score + 50)
          }}
        >
          {moleNumber === 3 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 4 && setScore(score + 50)
          }}
        >
          {moleNumber === 4 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 5 && setScore(score + 50)
          }}
        >
          {moleNumber === 5 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 6 && setScore(score + 50)
          }}
        >
          {moleNumber === 6 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 7 && setScore(score + 50)
          }}
        >
          {moleNumber === 7 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 8 && setScore(score + 50)
          }}
        >
          {moleNumber === 8 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 9 && setScore(score + 50)
          }}
        >
          {moleNumber === 9 && <img src={mole} className="w-20 h-20" />}
        </div>
      </div>
      <h6
        className="absolute font-semibold bottom-2 hover:opacity-50"
        onClick={(e) => {
          e.preventDefault()
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
          <button
            onClick={() => {
              setShowResult(false)
              setInitial(false)
              setTimer(COUNTDOWN_TIMER)
              setScore(0)
              randomGenerator()
            }}
            className="w-8/12 p-4 m-2 text-xl bg-white border border-gray-800 rounded-lg shadow-lg focus:outline-none active:outline-none active:bg-gray-50 md:w-4/12"
          >
            Play
          </button>
        </div>
      )}
    </div>
  )
}

export default App
