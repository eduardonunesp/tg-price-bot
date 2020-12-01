const { Telegraf } = require('telegraf')
const session = require('telegraf-session-sqlite')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./price_bot.sqlite')

async function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN)

  const options = {
    db,
    table_name: 'price_bot_session',
  }

  bot.use(session(options))

  bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
  })

  bot.catch((err, ctx) => {
    console.error(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })

  bot.launch()
}

main().then(console.log).catch(console.error)
