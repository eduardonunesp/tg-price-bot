const Base = require('./base')

class ClearAlerts extends Base {
  handle() {
    return '/clear_alerts'
  }

  execute(ctx) {
    ctx.session.alerts = []
    ctx.reply('😟')
  }
}

module.exports = ClearAlerts
