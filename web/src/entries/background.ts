import { browser } from 'wxt/browser'

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message) // "ping"

    // Wait 1 second and respond with "pong"
    setTimeout(() => sendResponse(), 1000)
    return true
  })
})
