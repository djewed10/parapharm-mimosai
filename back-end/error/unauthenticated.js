const { StatusCodes } = require('http-status-codes');
const Custom = require('./custom');


class UnauthenticatedError extends Custom {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;