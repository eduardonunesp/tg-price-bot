require('chai')

const { expect } = require('chai');
const MercadoBitcoin = require('./MercadoBitcoin')

describe('MercadoBitcoin', () => {
  it('Should get ticker prices', async () => {
    const bt = new MercadoBitcoin()
    const result = await bt.getTick()
    expect(result).to.be.ok
  });
});