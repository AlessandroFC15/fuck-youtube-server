import cheerio from 'cheerio'

import { getPageHTML } from '../../utils'

const getVideoSrc = async youtubeUrl => {
  const genyoutubeUrl = `https://video.genyt.net/${getIdFromYoutubeUrl(youtubeUrl)}`

  const pageHTML = await getPageHTML({
    url: genyoutubeUrl,
    selectorToWaitFor: 'a.downbuttonstyle'
  })

  const videoQualitiesToSearchFor = [
    { type: VideoQuality.HD, resolution: 720 },
    { type: VideoQuality.SD, resolution: 360 }
  ]

  for (const videoQuality of videoQualitiesToSearchFor) {
    const videoLink = findVideoLink(pageHTML, videoQuality.type)

    if (videoLink) {
      return {
        resolution: videoQuality.resolution,
        link: videoLink
      }
    }
  }

  return null
}

const findVideoLink = (pageHTML, videoQuality) => {
  const $ = cheerio.load(pageHTML)

  const videoIconClass = {
    [VideoQuality.HD]: 'glyphicon-hd-video',
    [VideoQuality.SD]: 'glyphicon-sd-video'
  }

  const videoIcon = $(`.${videoIconClass[videoQuality]}`)[0]

  if (!videoIcon) {
    return null
  }

  const linkTag = videoIcon.parent.parent

  const videoSizeElement = $('.labelw', linkTag)[0]

  return videoSizeElement
    ? formatLink(linkTag.attribs.href)
    : null
}

const getIdFromYoutubeUrl = url => new URL(url).searchParams.get('v')

// The links provided by the GenYoutube platform usually come with a parameter called title that makes the video
// get downloaded. This method aims to remove that parameter and return a link without that parameter
const formatLink = genYoutubeLink => {
  const url = new URL(genYoutubeLink)

  const searchParams = url.searchParams
  searchParams.delete('title')

  return `${url.origin}${url.pathname}?${searchParams.toString()}`
}

const VideoQuality = Object.freeze({
  HD: 'high_definition',
  SD: 'standard_definition'
})

export default {
  getVideoSrc
}
