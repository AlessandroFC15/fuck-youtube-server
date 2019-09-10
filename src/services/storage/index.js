import db from './firebase'

const saveAttempt = ({ videoId, successful, provider }) =>
  db && db.collection('attempts').add({
    dateCreated: new Date(),
    videoId,
    successful,
    provider
  })

export {
  saveAttempt
}
