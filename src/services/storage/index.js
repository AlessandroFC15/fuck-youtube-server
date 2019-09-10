import db from './firebase'

const saveAttempt = ({ videoId, successful }) =>
  db && db.collection('attempts').add({
    dateCreated: new Date(),
    videoId,
    successful
  })

export {
  saveAttempt
}
