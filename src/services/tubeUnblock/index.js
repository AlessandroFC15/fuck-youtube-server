import cheerio from 'cheerio'

import { isYoutubeVideoLink } from '../../utils'
import { baseUrl, getMainPageResponse, getResponseFromEmbedEndpoint } from './requester'

const getVideoSrc = async youtubeVideoUrl => {
  if (!isYoutubeVideoLink(youtubeVideoUrl)) {
    return null
  }

  const response = await getMainPageResponse(youtubeVideoUrl)
  const iframeLink = getIframeLink(response.data)

  if (!iframeLink) {
    return null
  }

  const embedResponse = await getResponseFromEmbedEndpoint(iframeLink)
  const videoSrc = findVideoSrc(embedResponse.data)

  return videoSrc ? {
    resolution: 360,
    link: baseUrl + videoSrc
  } : null
}

const getIframeLink = tubeUnblockPage => cheerio.load(tubeUnblockPage)('#iframePlayer').attr('src')

const findVideoSrc = embedResponse => {
  const matches = embedResponse.match(/updateSrc\(\[(?<mirrorData>.*?)\]\)/)

  return matches
    ? /src: "(.*?)"/.exec(matches.groups.mirrorData)[1]
    : null
}

export {
  getVideoSrc
}
