const session = require('telegraf-session-sqlite')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./price_bot.sqlite')

const options = {
  db,
  table_name: 'price_bot_session',
}

module.exports = session(options)
