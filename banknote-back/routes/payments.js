const express = require('express')
const router = express.Router()
const Payment = require('../models/Payment')
const User = require('../models/User')

router.post("/add", (req, res, next) => {
  Payment.create(req.body)
    .then(payment =>
      User.findByIdAndUpdate(req.body.user, { $push: { payments: payment._id } }, { new: true })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err))
    )
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res, next) => {
  console.log(req.params)
  const { id } = req.params
  User.findOne({ _id: id }).populate('payments')
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})


module.exports = router