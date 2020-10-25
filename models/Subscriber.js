/// models
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// Schema
const SubscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true  
  }
});

SubscriberSchema.plugin(timestamp);

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
// export the module
module.exports = Subscriber;