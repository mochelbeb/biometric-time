const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
}, { 
    timestamps: {
        createdAt: 'dateCreated',
        updatedAt: null
    }
});

employeeSchema.index({ firstName: 1, lastName: 1, department: 1 }, { unique: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
