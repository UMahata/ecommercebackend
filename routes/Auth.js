const express = require('express')
const { fetchUserById, updateUser } = require('../controller/User')
const { createUser ,loginUser } = require('../controller/Auth')

const router = express.Router()

router
      .post('/signup',createUser).post('/login', loginUser)
      

exports.router = router