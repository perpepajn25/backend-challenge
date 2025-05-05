const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  try {
    if (mongodb.readyState === mongodb.ReadyStates.connected) {
      res.status(200).send({
        status: 'OK',
        message: 'Server is connected to MongoDB'
      })
    } else {
      res.status(500).send({
        status: 'Internal Server Error',
        message: 'Unable to connect to MongoDB'
      })
    }
  } catch (err) {
    res.status(500).send({
      status: 'Internal Server Error',
      message: 'Error checking MongoDB connection'
    })
  }
}
