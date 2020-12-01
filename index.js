const { Telegraf } = require('telegraf')

async function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN)
  bot.start((ctx) => ctx.reply('Welcome!'))
  bot.command('oldschool', (ctx) => ctx.reply('Hello'))
  bot.command('modern', ({ reply }) => reply('Yo'))
  bot.command('hipster', Telegraf.reply('λ'))
  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  bot.hears('hi', (ctx) => ctx.reply('Hey there'))
  bot.launch()
}

main().then(console.log).catch(console.error)
