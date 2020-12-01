const Base = require('./base')

class ShowAlerts extends Base {
  handle() {
    return '/show_alerts'
  }

  execute(ctx) {
    ctx.reply(JSON.stringify(ctx.session.alerts, null, 2))
  }
}

module.exports = ShowAlerts
