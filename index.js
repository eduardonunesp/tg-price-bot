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

  bot.use(async (ctx, next) => {
    ctx.session.alerts = ctx.session.alerts || []
    await next()
  })

  bot.command('/alert', (ctx) => {
    const alertArr = ctx.message.text.split(' ').splice(1)
    const [coin, label, value] = alertArr

    ctx.session.alerts.push({
      coin,
      label,
      value,
    })

    ctx.reply('😎')
  })

  bot.command('/show_alerts', (ctx) => {
    ctx.reply(JSON.stringify(ctx.session.alerts, null, 2))
  })

  bot.command('/clear_alerts', (ctx) => {
    ctx.session.alerts = []
    ctx.reply('😟')
  })

  bot.on('sticker', (ctx) => {
    ctx.session.counter = ctx.session.counter || 0
    ctx.session.counter++
    ctx.reply('👍')
  })

  bot.catch((err, ctx) => {
    console.error(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })

  bot.launch()
}

main().then(console.log).catch(console.error)
