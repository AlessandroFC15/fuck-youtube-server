import express from 'express'
import { check, validationResult } from 'express-validator'

import tubeUnblock from './services/tubeUnblock'
import genYoutube from './services/genYoutube'

const app = express()

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'World' }))
})

const queryValidation = [ check('youtubeVideoId').not().isEmpty() ]

app.get('/getVideoSrc', queryValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const services = [tubeUnblock, genYoutube]

  for (const service of services) {
    const videoSrc = await service.getVideoSrc(`https://www.youtube.com/watch?v=${req.query.youtubeVideoId}`)

    if (videoSrc) {
      return res.json({
        url: videoSrc.link,
        resolution: videoSrc.resolution
      })
    }
  }

  res.json({
    url: null
  })
})

export default app
