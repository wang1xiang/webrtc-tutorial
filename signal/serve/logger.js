import log4js from 'log4js'

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'socket.log',
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug',
    },
  },
})

const logger = log4js.getLogger()
export default logger
