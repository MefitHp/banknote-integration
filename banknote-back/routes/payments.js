const express = require('express')
const router = express.Router()
const Payment = require('../models/Payment')
const User = require('../models/User')

router.post("/add", (req, res, next) => {
  console.log(req.body)
  Payment.create(req.body)
    .then(payment =>
      User.findByIdAndUpdate(req.body.user, { $push: { payments: payment._id } }, { new: true })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err))
    )
    .catch(err => res.status(500).json(err))
})

module.exports = router