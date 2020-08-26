const { Appointment, Patient } = require('../models')
const { validationResult } = require('express-validator')
const { groupBy, reduce, orderBy } = require('lodash')

function AppointmentController() {}

const create = async function (req, res) {
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

  const patient = await Patient.findById(data.patient)

  if (!patient) {
    return res.status(404).json({
      succes: false,
      message: 'Patient is not found',
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

const update = function (req, res) {
  const valError = validationResult(req)
  const id = req.params.id
  const data = {
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

  Appointment.findByIdAndUpdate(id, data, (err, doc) => {
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

const remove = function (req, res) {
  const valError = validationResult(req)
  const id = req.params.id

  if (!valError.isEmpty()) {
    return res.status(400).json({
      succes: false,
      errors: valError.array(),
    })
  }

  Appointment.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      return res.status(500).json({
        succes: false,
        message: err,
      })
    }

    if (!doc) {
      return res.status(404).json({
        succes: false,
        message: 'Appointment not found',
      })
    }

    res.json({
      succes: true,
    })
  })
}

const all = function (req, res) {
  Appointment.find({})
    .populate('patient')
    .exec((err, docs) => {
      if (err) {
        return res.status(500).json({
          succes: false,
          message: err,
        })
      }

      res.json({
        succes: true,
        data: orderBy(
          reduce(
            groupBy(docs, 'date'),
            (result, obj, key) => {
              result = [...result, { title: key, data: obj }]
              return result
            },
            []
          ),
          ['title'],
          ['desc']
        ),
      })
    })
}

AppointmentController.prototype = {
  create,
  all,
  remove,
  update,
}

module.exports = AppointmentController
