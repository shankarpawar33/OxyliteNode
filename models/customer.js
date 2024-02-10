const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        unique: true,
        required: true,
        default: generateCustomerId
     },
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String, 
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    shiftTiming: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening']
    },
    customerType: {
        type: String,
        enum: ['Distributor', 'Customer']
    },
    plantOwnerId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming this references another document
        ref: 'Plant' // Assuming there's a PlantOwner model
    },
    subscribeProduct: {
        type: [String],
        enum: ['Jaar', 'Bislery', 'Pouch']
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'signUp'
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

function  generateCustomerId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const Customer = mongoose.model('customer', customerSchema,'customer');

module.exports = Customer;
