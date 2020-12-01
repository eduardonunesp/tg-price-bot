const Base = require('./base')

class BitcoinTrade extends Base {
  async getTick() {
    return true
  }
}

module.exports = BitcoinTrade