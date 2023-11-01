const {DEPARTMENT_LIST} = require('../../constants/department');
const Employee = require('../../models/employee');

module.exports.createEmployee_validator = async (req, res, next) => {
    const { firstName, lastName, department } = req.body;

    // body validation
    try {
        let errors = [];

        if (!firstName) {
            errors.push('First name is required');
        }

        if (!lastName) {
            errors.push('Last name is required');
        }

        if (!department || !DEPARTMENT_LIST.includes(department)) {
            errors.push('Department is required and must be one of the following: ' + DEPARTMENT_LIST.join(', ') + '.');
        }

        if (errors.length) {
            return res.status(400).json({
                message: errors.join(', ')
            });
        }

        // check if employee already exists
        const employee = await Employee.findOne({
            firstName,
            lastName,
            department
        });

        if (employee) {
            return res.status(400).json({
                message: 'Employee already exists'
            });
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server Error'
        });
    }
}