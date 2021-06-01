import firebase from "firebase/app"
import "firebase/firestore"
import { config } from "../config"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

firebase.initializeApp(config)
const db = firebase.firestore()

// export const authenticateAnonymously = () => {
//   return firebase.auth().signInAnonymously()
// }

export const addLeaderBoard = (name, score) => {
  return db.collection("leaderBoard").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    user: name,
    score: score,
  })
}

// export const getLeaderboard = async () => {
//   try {
//     let leaderboard = []
//     var boardRef = db.collection("leaderBoard")
//     let allleadersSnapShot = await boardRef.get()
//     allleadersSnapShot.forEach((doc) => {
//       let currentDoc = doc.data()
//       leaderboard.push({ user: currentDoc.user, score: currentDoc.score })
//     })
//     leaderboard = leaderboard.sort((a, b) => b.score - a.score)
//     const top5 = leaderboard.splice(0, 5)

//     return top5
//   } catch (err) {
//     console.log("Error getting documents", err)
//   }
// }

export const getLeaderboard = async () => {
  try {
    let leaderboard = []
    var boardRef = db.collection("leaderBoard")

    let allleadersSnapShot = await boardRef.orderBy("score", "desc").get()
    // let allleadersSnapShot = await boardRef.get()
    allleadersSnapShot.forEach((doc) => {
      let currentDoc = doc.data()
      leaderboard.push({ user: currentDoc.user, score: currentDoc.score })
    })

    const users = []
    const top5 = []
    for (let i = 0; i < leaderboard.length; i++) {
      if (!users.includes(leaderboard[i].user)) {
        users.push(leaderboard[i].user)
        top5.push({ user: leaderboard[i].user, score: leaderboard[i].score })
      }
      if (users.length === 5) {
        break
      }
    }
    return top5
  } catch (err) {
    console.log("Error getting documents", err)
  }
}
