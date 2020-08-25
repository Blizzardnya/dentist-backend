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

const update = function (req, res) {
  const valError = validationResult(req)
  const id = req.params.id
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

  Patient.findByIdAndUpdate(id, data, (err, doc) => {
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

  Patient.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      return res.status(500).json({
        succes: false,
        message: err,
      })
    }

    if (!doc) {
      return res.status(404).json({
        succes: false,
        message: 'Patient not found',
      })
    }

    res.json({
      succes: true,
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

const show = function (req, res) {
  const valError = validationResult(req)
  const id = req.params.id

  if (!valError.isEmpty()) {
    return res.status(422).json({
      succes: false,
      errors: valError.array(),
    })
  }

  Patient.findById(id, (err, doc) => {
    if (err) {
      return res.status(500).json({
        succes: false,
        message: err,
      })
    }

    if (!doc) {
      return res.status(404).json({
        succes: false,
        message: 'Patient not found',
      })
    }
  })
    .populate('appointments')
    .exec((err, doc) => {
      res.json({
        succes: true,
        data: { doc, appointments: doc.appointments },
      })
    })
}

PatientController.prototype = {
  all,
  create,
  update,
  remove,
  show,
}

module.exports = PatientController
