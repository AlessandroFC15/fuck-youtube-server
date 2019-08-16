export const isYoutubeVideoLink = (url) =>
  (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?(.*)(v=.+)(.*)$/).test(url)
