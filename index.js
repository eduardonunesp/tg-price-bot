const Robota = require('./robota')

async function main() {
  const bot = new Robota()
  bot.launch()
}

main().then(console.log).catch(console.error)
