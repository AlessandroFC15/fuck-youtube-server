import { getMainPageResponse, getResponseFromEmbedEndpoint } from './requester'
import service from './index'
import { getMockResponse } from '../../mocks'

const { getVideoSrc } = service

jest.mock('./requester')

const validMainPageResponse = getMockResponse('/tubeUnblock/mainPageResponse.html')
const validEmbedResponse = getMockResponse('/tubeUnblock/embedResponse.html')

describe('extract mirrors from TubeUnblock page', () => {
  describe('successful scenarios', () => {
    beforeEach(() => {
      getMainPageResponse.mockResolvedValue(validMainPageResponse)
      getResponseFromEmbedEndpoint.mockResolvedValue(validEmbedResponse)
    })

    it('should return video source starting with "https://tubeunblock.com/video/"', () => {
      return expect(getVideoSrc('tliR8gHahjc')).resolves.toMatchObject({
        resolution: 360,
        link: expect.stringContaining('https://tubeunblock.com/video/')
      })
    })
  })

  describe('unsuccessful scenarios', () => {
    it('should return null when iframe src is not found on TubeUnblock page', () => {
      getMainPageResponse.mockResolvedValue('<html>Error Page</html>')

      return expect(getVideoSrc('tliR8gHahjc')).resolves.toBe(null)
    })

    it('should return null when second request (sent to /embed) returns page without video source', () => {
      getMainPageResponse.mockResolvedValue(validMainPageResponse)
      getResponseFromEmbedEndpoint.mockResolvedValue('<html>Error Page</html>')

      return expect(getVideoSrc('tliR8gHahjc')).resolves.toBe(null)
    })

    it('should return null when request to main page fails', () => {
      getMainPageResponse.mockResolvedValue(null)

      return expect(getVideoSrc('tliR8gHahjc')).resolves.toBe(null)
    })

    it('should return null when request to embed endpoint fails', () => {
      getMainPageResponse.mockResolvedValue(validMainPageResponse)
      getResponseFromEmbedEndpoint.mockResolvedValue(null)

      return expect(getVideoSrc('tliR8gHahjc')).resolves.toBe(null)
    })
  })
})
