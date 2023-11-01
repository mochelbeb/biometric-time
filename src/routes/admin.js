const { Router } = require('express');

const router = Router();

//** Controllers **//
const employee = require('../controllers/employee');
const check_controller = require('../controllers/check');
const { checkOut_validator } = require('../business-logic/middlewares/validators/checkOut');

//** Validators **//
const employee_validator = require('../business-logic/middlewares/validators/createEmployee').createEmployee_validator;
const checkIn_validator = require('../business-logic/middlewares/validators/checkIn').checkIn_validator;


//** Routes **//
router.post('/createEmployee', employee_validator , employee.createEmployee);
router.get('/getEmployees', employee.getEmployees);

router.post('/check-in/:user_id', checkIn_validator, check_controller.checkIn);
router.post('/check-out/:user_id', checkOut_validator, check_controller.checkOut);

module.exports = router;