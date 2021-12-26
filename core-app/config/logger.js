const { createLogger, transports, format } = require('winston');
 
const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf((info) => {
      return `${info.level}: ${info.message} - ${info.timestamp}`;
    })
  ),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/combined.log',
      maxsize: 5242880, // 5MB
    }),
    new transports.File({
      level: 'error',
      filename: './logs/errors.log',
      maxsize: 5242880
    }),
    // also print errors to console
    new transports.Console({
      level: 'error'
    })
  ]
});

module.exports = logger;
