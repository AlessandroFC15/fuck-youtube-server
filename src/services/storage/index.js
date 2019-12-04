import db from './firebase'

const saveAttempt = ({ videoId, successful, provider, origin = '' }) =>
  db && db.collection('attempts').add({
    dateCreated: new Date(),
    videoId,
    successful,
    provider,
    origin
  })

export {
  saveAttempt
}
