require('chai')

const { expect } = require('chai');
const BitcoinTrade = require('./bitcointrade')

describe('BitcoinTrade', () => {
  it('Should get ticker prices', async () => {
    const bt = new BitcoinTrade()
    const result = await bt.getTick()
    expect(result).to.be.ok
  });
});