const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// encrypt the user password before save to the database
UserSchema.pre("save", async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// object method to generate user authentication token
UserSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id}, "secretcode")
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

// static method for identify user by their email and password
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('Please enter authorized email address')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Password is not matched')
  }
  return user
}

const User = mongoose.model('users', UserSchema)

module.exports = User