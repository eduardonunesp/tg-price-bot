module.exports = async (ctx, next) => {
  ctx.session.alerts = ctx.session.alerts || []
  await next()
}
