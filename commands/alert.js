const Base = require('./base')

class Alert extends Base {
  handle() {
    return '/alert'
  }

  execute(ctx) {
    const alertArr = ctx.message.text.split(' ').splice(1)
    const [coin, label, value] = alertArr

    ctx.session.alerts.push({
      coin,
      label,
      value,
    })

    ctx.reply('😎')
  }
}

module.exports = Alert
