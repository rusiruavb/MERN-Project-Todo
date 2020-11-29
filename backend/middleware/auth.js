const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const decode = jwt.verify(token, "secretcode")
    const user = await User.findOne({_id: decode._id, "tokens.token": token})
    if (!user) {
      throw new Error('Please Authenticate')
    }
    req.token = token
    req.user = user 
    next()
  } catch (error) {
    res.status(401).send({message: error.message})
    console.log(error.message)
  }
}

module.exports = auth