import axios from 'axios'

const baseUrl = 'https://tubeunblock.com'

const getMainPageResponse = videoId =>
  axios.get(`https://tubeunblock.com/watch?v=${videoId}`)

const getResponseFromEmbedEndpoint = embedSrc =>
  axios.get(baseUrl + embedSrc)

export {
  getMainPageResponse,
  getResponseFromEmbedEndpoint,
  baseUrl
}
