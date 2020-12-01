const Base = require('./base')
const axios = require('axios')

const URL = 'https://www.mercadobitcoin.net/api/BTC/ticker'

class MercadoBitcoin extends Base {
  async getTick() {
    const {data} = await axios.get(URL)
    return data.ticker.last
  }
}

module.exports = MercadoBitcoin