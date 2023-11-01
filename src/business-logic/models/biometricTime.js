
const mongoose = require('mongoose');

const biometricSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    checkIn: Date,
    checkOut: Date,
    comment: String,
    workTime: String,
}, { 
    timestamps: {
        createdAt: 'dateCreated',
        updatedAt: 'dateUpdated'
    },
});

const Biometric = mongoose.model('Biometric', biometricSchema);

module.exports = Biometric;
