const BitcointTrade = require('./exchanges/bitcointrade')
const MercadoBitcoin = require('./exchanges/mercadobitcoin')

const EXCHANGES = {
  'mercadobitcoin': new MercadoBitcoin(),
  'bitcointrade': new BitcointTrade()
}

class Exchange {
  static Create(name) {
    const exchangeSelected = EXCHANGES[name]

    if (!exchangeSelected) {
      throw Error(`Invalid exchange for ${name}`)
    }

    return new Exchange(exchangeSelected)
  }

  static async AVG() {
    let value = 0
    const exchangeNames = Object.keys(EXCHANGES)
    for (const exchangeName of exchangeNames) {
      const exchange = Exchange.Create(exchangeName)
      value += await exchange.getTick()
    }
    return parseInt(value / exchangeNames.length, 10)
  }

  constructor(exImpl) {
    this.exImpl = exImpl
  }

  async getTick() {
    return parseInt(await this.exImpl.getTick(), 10)
  }
}

module.exports = Exchange