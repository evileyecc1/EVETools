const baseUrl = 'http://api.eve-info.net'
const testUrl = 'http://evehelper.test'

function getBaseUrl() {
  if (process.env.NODE_ENV == 'production') {
    return baseUrl
  }
  return testUrl
}

export { baseUrl, getBaseUrl }
