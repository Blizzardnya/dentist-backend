const { check, param } = require('express-validator')

const validation = {
  create: [
    check('fullname').isLength({ min: 6 }),
    check('phone').isLength({ min: 12 }),
  ],
  remove: [param('id').isMongoId()],
  update: [
    param('id').isMongoId(),
    check('fullname').isLength({ min: 6 }),
    check('phone').isLength({ min: 12 }),
  ],
  show: [param('id').isMongoId()],
}

module.exports = validation
