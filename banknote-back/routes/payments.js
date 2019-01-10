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
  const { id } = req.params
  User.findOne({ _id: id }).populate('payments')
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})

router.delete('/delete/:id', (req, res, next) => {
  const { id } = req.params
  Payment.findByIdAndDelete({ _id: id })
    .then(payment =>
      res.status(200).json(payment))
    .catch(err => res.status(500).json(err))
})

module.exports = router