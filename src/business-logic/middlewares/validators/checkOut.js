const Employee = require('../../models/employee');
const Biometric = require('../../models/biometricTime');
const moment = require('moment');

module.exports.checkOut_validator = async (req, res, next) => {
    const { user_id } = req.params;

    try {
        if (!user_id)
            return res.status(400).json({
                status: false,
                message: 'User ID is required'
            });

        // check if employee exists and already checked-in
        const employee = await Employee.findOne({
            _id: user_id
        });

        if (!employee)
            return res.status(400).json({
                status: false,
                message: 'Employee not found'
            });
        
        const biometric = await Biometric.findOne({
            user_id: user_id,
            checkIn: { $ne: null },
            checkOut: null,
            dateCreated: {
                $gte: moment().startOf('day').toDate(),
                $lt: moment().endOf('day').toDate()
            }
        });

        if (!biometric)
            return res.status(400).json({
                status: false,
                message: 'Employee did not check-in yet or already checked-out'
            });

        req.checkIn = biometric.checkIn;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server Error'
        });
    }
}