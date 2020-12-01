const sqlite3 = require('sqlite3').verbose()

class Alerts {
  constructor() {
    this.db = new sqlite3.Database('./price_bot.sqlite')
  }

  getAlerts() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT id, session FROM price_bot_session;', (err, rows) => {
        if (err) {
          reject(err)
        }

        resolve(
          rows.map((row) => ({
            id: row.id.split(':').splice(1),
            alerts: JSON.parse(row.session).alerts || [],
          }))
        )
      })
    })
  }
}

module.exports = Alerts
