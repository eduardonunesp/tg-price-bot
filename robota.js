const { Telegraf } = require('telegraf')
const { Exchange } = require('./exchange')
const Alerts = require('./alerts')

const CHECK_TIMER = 3000

const MIDDLEWARES = [
  require('./middlewares/session'),
  require('./middlewares/alerts'),
  require('./middlewares/benchmark'),
]

const COMMANDS = [
  (CMD_CREATE_ALERT = new (require('./commands/alert'))()),
  (CMD_SHOW_ALERTS = new (require('./commands/show_alerts'))()),
  (CMD_CLEAR_ALERTS = new (require('./commands/clear_alerts'))()),
]

class Robota {
  constructor() {
    // SESSION ID ${ctx.from.id}:${ctx.chat.id}
    this.ctxs = {}
    this.alerts = new Alerts()
    this.bot = new Telegraf(process.env.BOT_TOKEN)
    this.bot.use(...MIDDLEWARES)
    this.bot.use((ctx, next) => {
      this.ctxs[ctx.from.id] = ctx
      next()
    })

    this.timerHandler = null

    this.bot.catch((err, ctx) => {
      console.error(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    process.on('SIGINT', () => {
      clearInterval(this.timerHandler)
      process.exit(0)
    })

    this.buildCommands()
    this.checkTickers()
  }

  checkTickers() {
    this.timerHandler = setInterval(async () => {
      const value = await Exchange.AVG()
      const userAlerts = await this.alerts.getAlerts()

      for (const userAlert of userAlerts) {
        for (const alert of userAlert.alerts) {
          if (+alert.value <= value) {
            const ctx = this.ctxs[userAlert.id]
            if (ctx) {
              ctx.session.alerts = []
              ctx.reply(JSON.stringify(alert))
            }
          }
        }
      }

      // console.log(value, alerts)
      // console.log('CHECK COIN PRINCE', value)
      // console.log()
      // this.
      // for (const [key, ctx] of Object.entries(this.ctxs)) {
      // ctx.reply('OK')
      // }
    }, CHECK_TIMER)
  }

  buildCommands() {
    COMMANDS.forEach((command) => {
      this.bot.command(command.handle(), (ctx) => command.execute(ctx))
    })
  }

  launch() {
    this.bot.launch()
  }
}

module.exports = Robota
