const Employee = require('../business-logic/models/employee');
const moment = require('moment');

module.exports.createEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
        const employee = await Employee.create({
            firstName,
            lastName,
            department
        });

        if (!employee) {
            return res.status(400).json({
                message: 'Employee not created'
            });
        }

        res.status(200).json({
            message: 'Employee created successfully',
            data: employee
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }

};

module.exports.getEmployees = async (req, res) => {
    try {
        // get all employees + (optional) filter by date of creation eg. 2021-01-01
        const { date } = req.query;

        let query = {};

        if (date) {
            query.dateCreated = {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            };
        }

        const employees = await Employee.find(query);

        if (!employees || !employees.length) {
            return res.status(400).json({
                message: 'Employees not found'
            });
        }

        res.status(200).json({
            message: 'Employees found',
            data: employees
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};