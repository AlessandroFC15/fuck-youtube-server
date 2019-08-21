import axios from 'axios'

const baseUrl = 'https://tubeunblock.com'

const getMainPageResponse = videoId =>
  axios.get(`https://tubeunblock.com/watch?v=${videoId}`)
    .then(response => response.data)
    .catch(error => console.log(error.stack))

const getResponseFromEmbedEndpoint = embedSrc =>
  axios.get(baseUrl + embedSrc)
    .then(response => response.data)
    .catch(error => console.log(error.stack))

export {
  getMainPageResponse,
  getResponseFromEmbedEndpoint,
  baseUrl
}
