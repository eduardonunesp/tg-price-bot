const { Telegraf } = require('telegraf')

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
    this.bot = new Telegraf(process.env.BOT_TOKEN)
    this.bot.use(...MIDDLEWARES)

    this.bot.catch((err, ctx) => {
      console.error(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    this.buildCommands()
  }

  checkTickers() {}

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
