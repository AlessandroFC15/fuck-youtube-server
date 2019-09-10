import request from 'supertest'

import app from './app'
import tubeUnblock from './services/tubeUnblock'
import genYoutube from './services/genYoutube'
import { saveAttempt } from './services/storage'

jest.mock('./services/tubeUnblock')
jest.mock('./services/genYoutube')
jest.mock('./services/storage')

const findSourceRequest = youtubeVideoId =>
  request(app)
    .get('/getVideoSrc')
    .query({ youtubeVideoId })

describe('Test the find source method', () => {
  beforeEach(() => saveAttempt.mockResolvedValue(null))

  describe('successful scenarios', () => {
    const videoId = 'random-video-id'

    it('returns a valid video source when a source is available only on TubeUnblock', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue({
        resolution: 360,
        link: 'tubeunblock-link'
      })
      genYoutube.getVideoSrc.mockResolvedValue(null)

      return findSourceRequest(videoId)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'tubeunblock-link',
            resolution: 360
          })
          expect(saveAttempt).toHaveBeenCalledWith({ videoId, successful: true })
        })
    })

    it('returns a valid video source when a source is available only on GenYouTube', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue(null)
      genYoutube.getVideoSrc.mockResolvedValue({
        resolution: 360,
        link: 'genyoutube-link'
      })

      return findSourceRequest(videoId)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'genyoutube-link',
            resolution: 360
          })
          expect(saveAttempt).toHaveBeenCalledWith({ videoId, successful: true })
        })
    })

    it('returns the first valid video source found when all services offer a valid one', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue({
        resolution: 720,
        link: 'tubeunblock-link'
      })
      genYoutube.getVideoSrc.mockResolvedValue({
        resolution: 360,
        link: 'genyoutube-link'
      })

      return findSourceRequest(videoId)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'tubeunblock-link',
            resolution: 720
          })
          expect(saveAttempt).toHaveBeenCalledWith({ videoId, successful: true })
        })
    })
  })

  describe('unsuccessful scenarios', () => {
    const videoId = 'random-video-id'

    it.each(['', null, undefined])(
      'responds 422 with error JSON response when "youtubeVideoId" is %p',
      youtubeVideoId =>
        findSourceRequest(youtubeVideoId)
          .expect('Content-Type', /application\/json/)
          .expect(422)
          .then(res => {
            expect(res.body.errors.length).toBe(1)
            expect(saveAttempt).not.toHaveBeenCalledWith()
          })
    )

    it('responds 200 with empty url when no video source is found', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue(null)
      genYoutube.getVideoSrc.mockResolvedValue(null)

      return findSourceRequest(videoId)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: null
          })
          expect(saveAttempt).toHaveBeenCalledWith({ videoId, successful: false })
        })
    })
  })
})
