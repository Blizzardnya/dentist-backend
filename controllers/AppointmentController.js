const { Appointment } = require('../models')
const { validationResult } = require('express-validator')

function AppointmentController() {}

const create = function (req, res) {
  const valError = validationResult(req)
  const data = {
    patient: req.body.patient,
    dent_number: req.body.dent_number,
    diagnosis: req.body.diagnosis,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
  }

  if (!valError.isEmpty()) {
    return res.status(422).json({
      succes: false,
      errors: valError.array(),
    })
  }

  Appointment.create(data, (err, doc) => {
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
  Appointment.find({}, (err, docs) => {
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
  }).populate('patient')
}

AppointmentController.prototype = {
  create,
  all,
}

module.exports = AppointmentController
