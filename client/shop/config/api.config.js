const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isProdMode ? 'http://xin.xiaobaikm.xin/api/' : 'api/'
}
