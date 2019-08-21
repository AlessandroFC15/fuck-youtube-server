import service from './index'
import { getMockResponse } from '../../mocks'
import { getPageHTML } from '../../utils'

const { getVideoSrc } = service

jest.mock('../../utils')

describe('extract mirror from GenYoutube page', () => {
  describe('successful scenarios', () => {
    it('should return 720p video source when available"', () => {
      getPageHTML.mockResolvedValue(getMockResponse('/genYoutube/responseWith720pLink.html'))

      return expect(getVideoSrc('https://www.youtube.com/watch?v=tliR8gHahjc')).resolves.toMatchObject({
        resolution: 720,
        link: expect.stringContaining('http://ss.de.prx.genyoutube.com/redirector.googlevideo.com/videoplayback')
      })
    })

    it('should return 360p video source when there is no 720p"', () => {
      getPageHTML.mockResolvedValue(getMockResponse('/genYoutube/responseOnly360pLink.html'))

      return expect(getVideoSrc('https://www.youtube.com/watch?v=tliR8gHahjc')).resolves.toMatchObject({
        resolution: 360,
        link: expect.stringContaining('http://ss.de.prx.genyoutube.com/redirector.googlevideo.com/videoplayback')
      })
    })
  })

  describe('unsuccessful scenarios', () => {
    it('should return null when no video source is found"', () => {
      getPageHTML.mockResolvedValue(getMockResponse('/genYoutube/responseNoLink.html'))

      return expect(getVideoSrc('https://www.youtube.com/watch?v=tliR8gHahjc')).resolves.toBe(null)
    })
  })
})
