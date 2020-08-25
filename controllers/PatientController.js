const { Patient } = require('../models')
const { validationResult } = require('express-validator')

function PatientController() {}

const create = function (req, res) {
  const valError = validationResult(req)
  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone,
  }

  if (!valError.isEmpty()) {
    return res.status(422).json({
      succes: false,
      errors: valError.array(),
    })
  }

  Patient.create(data, (err, doc) => {
    if (err) {
      return res.status(500).json({
        succes: false,
        message: err,
      })
    }

    res.status(201).json({
      succes: true,
      data: doc,
    })
  })
}

const all = function (req, res) {
  Patient.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({
        succes: false,
        message: err,
      })
    }

    res.json({
      succes: true,
      data: docs,
    })
  })
}

PatientController.prototype = {
  all,
  create,
}

module.exports = PatientController
