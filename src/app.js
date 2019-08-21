import express from 'express'
import { check, validationResult } from 'express-validator'

import tubeUnblock from './services/tubeUnblock'
import genYoutube from './services/genYoutube'

const app = express()

const queryValidation = [ check('youtubeVideoId').not().isEmpty() ]

app.get('/getVideoSrc', queryValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const services = [tubeUnblock, genYoutube]

  for (const service of services) {
    const videoSrc = await service.getVideoSrc(req.query.youtubeVideoId)

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
