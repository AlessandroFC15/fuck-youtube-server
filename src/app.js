import express from 'express'
import { check, validationResult } from 'express-validator'

import tubeUnblock from './services/tubeUnblock'
import genYoutube from './services/genYoutube'
import { saveAttempt } from './services/storage'

const app = express()

const queryValidation = [ check('youtubeVideoId').not().isEmpty() ]

app.get('/getVideoSrc', queryValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const videoId = req.query.youtubeVideoId

  const services = [tubeUnblock, genYoutube]

  for (const service of services) {
    const videoSrc = await service.getVideoSrc(videoId)

    if (videoSrc) {
      saveAttempt({ videoId, successful: true })
      return res.json({
        url: videoSrc.link,
        resolution: videoSrc.resolution
      })
    }
  }

  saveAttempt({ videoId, successful: false })
  res.json({
    url: null
  })
})

app.get('/', (req, res) => res.send('This endpoint is used to prevent the Heroku app from sleeping. ' +
  'The main endpoint can be found at /getVideoSrc'))

export default app
