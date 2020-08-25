const express = require('express')
const cors = require('cors')

const db = require('./core/db')
const {
  patientValidation,
  appointmentValidation,
} = require('./utils/validations')
const { PatientCtrl, AppointmentCtrl } = require('./controllers')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/patients', PatientCtrl.all)
app.get('/patients/:id', patientValidation.show, PatientCtrl.show)
app.post('/patients', patientValidation.create, PatientCtrl.create)
app.delete('/patients/:id', patientValidation.remove, PatientCtrl.remove)
app.patch('/patients/:id', patientValidation.update, PatientCtrl.update)

app.get('/appointments', AppointmentCtrl.all)
app.post('/appointments', appointmentValidation.create, AppointmentCtrl.create)
app.delete(
  '/appointments/:id',
  appointmentValidation.remove,
  AppointmentCtrl.remove
)
app.patch(
  '/appointments/:id',
  appointmentValidation.update,
  AppointmentCtrl.update
)

app.listen(6666, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server is runned')
})
