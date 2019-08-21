import puppeteer from 'puppeteer'

export const isYoutubeVideoLink = (url) =>
  (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?(.*)(v=.+)(.*)$/).test(url)

export const getPageHTML = async ({ url, selectorToWaitFor }) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'domcontentloaded' })

  if (selectorToWaitFor) {
    await page.waitForSelector(selectorToWaitFor)
  }

  return page.evaluate(() => document.documentElement.outerHTML)
}
