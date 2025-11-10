const mongoose = require('mongoose');

const propertyListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  propertyType: {
    type: String,
    enum: ['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, default: 'CA' },
    zipCode: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  squareFeet: {
    type: Number
  },
  lotSize: {
    type: Number
  },
  yearBuilt: {
    type: Number
  },
  images: [{
    type: String 
  }],
  listedDate: {
    type: Date,
    default: Date.now
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  contactInfo: {
    name: String,
    phone: String,
    email: String
  },
  features: [String], 
  listingAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listingType: {
    type: String,
    enum: ['Sale', 'Rent'],
    required: true
  }
});

module.exports = mongoose.model('PropertyListing', propertyListingSchema);