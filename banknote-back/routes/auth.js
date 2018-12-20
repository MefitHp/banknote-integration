const express = require('express')
const router = express.Router()
const passport = require('../helpers/passport')
const User = require("../models/User")


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") })
})

router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json(info)
    if (!user) return res.status(404).json(info)
    req.login(user, err => {
      return res.status(200).json(user)
    })
  })(req, res, next)
})

router.post("/signup", (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(401).json({ message: 'El email ya está registrado' })
      return
    }

    User.register(req.body, req.body.password)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })
})

router.post('/update', (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.body._id, { $set: { id_user: req.body.id_user } })
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(e => res.status(500).json(e))
})

router.get("/logout", (req, res) => {
  req.logout()
  res.status(200).json({ message: 'Sesión cerrada correctamente' })
})

module.exports = router
