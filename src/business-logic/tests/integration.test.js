const assert = require('assert');
const request = require('supertest');
const app = require('../../index');
const { createEmployee_validator } = require('../middlewares/validators/createEmployee');
const { DEPARTMENT_LIST } = require('../constants/department');
const { randomInt } = require('crypto');

describe('Unit Test for createEmployee request body : ', () => {
    it('should require three fields in the request body', (done) => {
        const req = {
            body: {
                firstName: 'Mohamed',
                lastName: 'islam',
                department: DEPARTMENT_LIST[randomInt(0, DEPARTMENT_LIST.length - 1)]    
            }
        };

        const res = {
            status: (status) => {
                assert.strictEqual(status, 400);
                return {
                    json: (response) => {
                        assert.strictEqual(response.message, undefined);
                        done();
                    }
                };
            }
        };

        createEmployee_validator(req, res, () => {
            done();
        });

    });
});

describe('Global Integration test: ', () => {
    let createdEmployee;
    it('should create a new employee', (done) => {
        request(app)
            .post('/admin/createEmployee')
            .send({
                firstName: 'Mohamed',
                lastName: 'islam',
                department: 'Computer Science'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                createdEmployee = res.body.data;
                console.log(createdEmployee);
                done();
            });
    });


    it('should return a list of employees', (done) => {
        request(app)
            .get('/admin/getEmployees')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should check in a employee', (done) => {
        request(app)
            .post(`/admin/check-in/${createdEmployee._id.toString()}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should check out a employee', (done) => {
        request(app)
            .post(`/admin/check-out/${createdEmployee._id.toString()}`)
            .send({ comment: "Employee left early"})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

});