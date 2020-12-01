const Base = require('./base')
const axios = require('axios')

const URL = 'https://api.bitcointrade.com.br/v3/public/BRLBTC/ticker'

class BitcoinTrade extends Base {
  async getTick() {
    const {data} = await axios.get(URL)
    return data.data.last
  }
}

module.exports = BitcoinTrade