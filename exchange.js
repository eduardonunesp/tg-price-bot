const EX_BITCOINTRADE = 'bitcointrade'
const EX_MERCADOBITCOIN = 'mercadobitcoin'

const EXCHANGES = {
  [EX_MERCADOBITCOIN]: new (require('./exchanges/mercadobitcoin'))(),
  [EX_BITCOINTRADE]: new (require('./exchanges/bitcointrade'))(),
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

module.exports = {
  Exchange,
  EX_BITCOINTRADE,
  EX_MERCADOBITCOIN,
}
