const timeCalculation = require('../business-logic/helpers/timeCalculation');
const Biometric = require('../business-logic/models/biometricTime');
const moment = require('moment');

module.exports.checkIn = async (req, res) => {
    const { user_id } = req.params;

    try {
        const biometric = await Biometric.create({
            user_id,
            checkIn: moment().toDate()
        });

        if (!biometric) {
            return res.status(400).json({
                message: 'Cannot check-in employee'
            });
        }

        res.status(200).json({
            message: 'Employee checked-in successfully',
            data: biometric
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }

};

module.exports.checkOut = async (req, res) => {
    const { user_id } = req.params;
    const { comment = 'NO COMMENT' } = req.body;

    try {
        const work_time = timeCalculation(req.checkIn, moment().toDate());

        const biometric = await Biometric.findOneAndUpdate({
            user_id: user_id,
            checkIn: { $ne: null },
            checkOut: null,
            dateCreated: {
                $gte: moment().startOf('day').toDate(),
                $lt: moment().endOf('day').toDate()
            }
        },{
            checkOut: moment().toDate(),
            comment: comment,
            workTime: work_time,
            
        }, {new: true});

        if (!biometric) {
            return res.status(400).json({
                message: 'Cannot check-out employee'
            });
        }

        res.status(200).json({
            message: 'Employee checked-out successfully',
            data: biometric
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};