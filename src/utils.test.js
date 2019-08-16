import { isYoutubeVideoLink } from './utils'

describe('method to check if url is a YouTube video link', () => {
  it('should return true for urls that correspond to YouTube videos', () => {
    const validUrls = [
      'https://www.youtube.com/watch?v=tliR8gHahjc',
      'https://www.youtube.com/watch?v=xYtsL9znopI&list=RDMdAcqWbgNUw&index=7',
      'https://www.youtube.com/watch?v=9Q59YDpxcaA&list=RD9Q59YDpxcaA&start_radio=1'
    ]

    validUrls.forEach(url => expect(isYoutubeVideoLink(url)).toEqual(true))
  })

  it('should return false for urls that are from YouTube but are not from videos', () => {
    const invalidUrls = [
      'https://www.youtube.com/',
      'https://www.youtube.com/channel/UCYRLqThkOVjysBOM6fgkqmQ'
    ]

    invalidUrls.forEach(url => expect(isYoutubeVideoLink(url)).toEqual(false))
  })

  it('should return false for urls that are not even from YouTube', () => {
    const invalidUrls = [
      'https://github.com',
      'https://www.ycombinator.com/',
      'https://www.linkedin.com/'
    ]

    invalidUrls.forEach(url => expect(isYoutubeVideoLink(url)).toEqual(false))
  })
})
