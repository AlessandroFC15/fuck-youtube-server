import axios from 'axios'

const baseUrl = 'https://tubeunblock.com'

const getMainPageResponse = youtubeVideoUrl =>
  axios.get(youtubeVideoUrl.replace('www.youtube.com', 'tubeunblock.com'))

const getResponseFromEmbedEndpoint = embedSrc =>
  axios.get(baseUrl + embedSrc)

export {
  getMainPageResponse,
  getResponseFromEmbedEndpoint,
  baseUrl
}
