const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  paymentName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payday: {
    type: Date,
    required: true,
  },
  description: {
    type: String
  },
  end_date: {
    type: Date,
    required: true,
  },
  month_count: {
    type: Number,
    required: true,
  },
  monthly_pay: {
    type: Number,
    required: true
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

module.exports = mongoose.model('Payment', paymentSchema)