const success = (res, message, data = {}) => {
  res.status(200).send({default_response: {status: true, message: message, errors: {}}, data})
}

const failure = (res, message, errors = {}) => {
  res.status(400).send({default_response: {status: false, message: message, errors}})
}

const forbidden = (res, message, errors = {}) => {
  res.status(403).send({default_response: {status: false, message: message, errors}})
}

module.exports = {
  success, failure, forbidden
}
