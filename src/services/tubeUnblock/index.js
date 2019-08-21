import cheerio from 'cheerio'

import { baseUrl, getMainPageResponse, getResponseFromEmbedEndpoint } from './requester'

const getVideoSrc = async youtubeVideoId => {
  const response = await getMainPageResponse(youtubeVideoId)

  if (!response) {
    return null
  }

  const iframeLink = getIframeLink(response)

  if (!iframeLink) {
    return null
  }

  const embedResponse = await getResponseFromEmbedEndpoint(iframeLink)

  if (!embedResponse) {
    return null
  }

  const videoSrc = findVideoSrc(embedResponse)

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

export default {
  getVideoSrc
}
