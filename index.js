const Exchange = require('./exchange')

async function main() {
  return await Exchange.AVG()
}

main()
  .then(console.log)
  .catch(console.error)
