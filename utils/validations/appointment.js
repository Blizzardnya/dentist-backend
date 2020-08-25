const { check } = require('express-validator')

const validation = {
  create: [
    check('patient').isMongoId(),
    check('dent_number').isInt({ min: 1, max: 48 }),
    check('price').isInt({ min: 0, max: 100000 }),
    check('diagnosis').isLength({ min: 3, max: 50 }),
    check('date').isLength({ min: 3, max: 50 }),
    check('time').isLength({ min: 3, max: 50 }),
  ],
}

module.exports = validation
