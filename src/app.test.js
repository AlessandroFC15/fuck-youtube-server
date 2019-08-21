import request from 'supertest'

import app from './app'
import tubeUnblock from './services/tubeUnblock'
import genYoutube from './services/genYoutube'

jest.mock('./services/tubeUnblock')
jest.mock('./services/genYoutube')

const findSourceRequest = youtubeVideoId =>
  request(app)
    .get('/getVideoSrc')
    .query({ youtubeVideoId })

describe('Test the find source method', () => {
  describe('successful scenarios', () => {
    it('returns a valid video source when a source is available only on TubeUnblock', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue({
        resolution: 360,
        link: 'tubeunblock-link'
      })
      genYoutube.getVideoSrc.mockResolvedValue(null)

      return findSourceRequest('random-video-id')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'tubeunblock-link',
            resolution: 360
          })
        })
    })

    it('returns a valid video source when a source is available only on GenYouTube', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue(null)
      genYoutube.getVideoSrc.mockResolvedValue({
        resolution: 360,
        link: 'genyoutube-link'
      })

      return findSourceRequest('random-video-id')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'genyoutube-link',
            resolution: 360
          })
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

      return findSourceRequest('random-video-id')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: 'tubeunblock-link',
            resolution: 720
          })
        })
    })
  })

  describe('unsuccessful scenarios', () => {
    it.each(['', null, undefined])(
      'responds 422 with error JSON response when "youtubeVideoId" is %p',
      youtubeVideoId =>
        findSourceRequest(youtubeVideoId)
          .expect('Content-Type', /application\/json/)
          .expect(422)
          .then(res => expect(res.body.errors.length).toBe(1))
    )

    it('responds 200 with empty url when no video source is found', () => {
      tubeUnblock.getVideoSrc.mockResolvedValue(null)
      genYoutube.getVideoSrc.mockResolvedValue(null)

      return findSourceRequest('random-video-id')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            url: null
          })
        })
    })
  })
})
