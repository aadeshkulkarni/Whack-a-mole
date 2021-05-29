import { useState, useEffect } from "react"
// import mole from "./bug-sharp.svg"
import mole from "./mole.svg"
import reset from "./reset.svg"
import Sound from "react-sound"
import successSound from "./notification.mp3"

function App() {
  const COUNTDOWN_TIMER = 20
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
      const id = setInterval(randomGenerator, 600)
      return () => clearInterval(id)
    }
  }, [moleNumber])

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
    <div className="w-full h-full bg-green-500 bg-opacity-90 flex flex-col justify-center items-center relative font-raleway">
      {resetScreen && (
        <div className="absolute inset-0 w-full h-hull bg-gray-800 flex flex-col justify-center items-center z-10">
          <div className="absolute inset-0 w-full h-hull bg-black flex flex-col justify-center items-center animate-pulse z-10">
            <h1 className="text-white text-xl animate-ping">Get Ready</h1>
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
        <h1 className="text-2xl text-gray-800  p-2">
          Highest score: {localStorage.getItem("highScore")}
        </h1>
      )}
      <h1 className="text-2xl text-gray-800  p-2">Score: {score}</h1>
      <h1 className="text-3xl text-gray-800  p-2 uppercase"> Whack A Mole</h1>
      <h2 className="text-2xl text-gray-800 p-2">Time Left: {timer}</h2>
      <div className="flex flex-wrap bg-green-700 w-320 h-320 shadow-xl rounded-sm p-1">
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 1 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 1 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 2 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 2 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 3 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 3 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 4 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 4 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 5 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 5 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 6 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 6 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 7 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 7 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 8 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 8 && <img src={mole} className="w-20 h-20" />}
        </div>
        <div
          className="bg-green-800 bg-opacity-90 h-100 w-100 m-0.5 shadow-lg hover:bg-green-900 cursor-pointer active:bg-green-700 flex justify-center items-center animate-pulse"
          onClick={() => {
            timer > 0 && moleNumber === 9 && setScore(score + 50)
            setMoleNumber()
          }}
        >
          {moleNumber === 9 && <img src={mole} className="w-20 h-20" />}
        </div>
      </div>
      <h6
        className="absolute bottom-2 font-semibold hover:opacity-50"
        onClick={(e) => {
          e.preventDefault()
          window.location.href = "https://aadeshkulkarni.me/"
        }}
      >
        Designed with <span className="text-red-900">&hearts;</span> by Aadesh
        Kulkarni
      </h6>
      {showResult && (
        <div className="absolute inset-0 w-full h-hull bg-black flex flex-col justify-center items-center">
          <h2 className="text-3xl text-white  p-2">Whack A Mole</h2>
          <img src={mole} className="w-24 h-24 m-6" />
          {localStorage.getItem("highScore") &&
            localStorage.getItem("highScore") !== "" && (
              <h2 className="text-2xl text-white  p-2">
                Highest score: {localStorage.getItem("highScore")}
              </h2>
            )}
          <h2 className="text-2xl text-white  p-2">Current score: {score}</h2>
          <button
            onClick={() => {
              setTimer(COUNTDOWN_TIMER)
              setScore(0)
              randomGenerator()
              setShowResult(false)
            }}
            className="bg-white p-4 w-8/12 text-xl m-2 rounded-lg shadow-lg border border-gray-800 focus:outline-none active:outline-none active:bg-gray-50 md:w-4/12"
          >
            Play Again
          </button>
        </div>
      )}
      {initial && (
        <div className="absolute inset-0 w-full h-hull bg-black flex flex-col justify-center items-center">
          <h2 className="text-3xl text-white  p-2">Whack A Mole</h2>
          <img src={mole} className="w-24 h-24 m-6" />
          <h3 className="text-xl text-white  p-2">Rules:</h3>
          <p className="text-base text-white p-3 w-7/12 text-center">
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
            className="bg-white p-4 w-8/12 text-xl m-2 rounded-lg shadow-lg border border-gray-800 focus:outline-none active:outline-none active:bg-gray-50 md:w-4/12"
          >
            Play
          </button>
        </div>
      )}
    </div>
  )
}

export default App
