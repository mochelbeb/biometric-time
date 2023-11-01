# Biometric Time Clock API -YASSIR CODE CAHLLENGE-

This Node.js application is a RESTful API for managing the Biometric Time Clock system. It includes the following features:

## Features

1. **Create Employee**
   - Endpoint: POST /admin/createEmployee
   - Description: Create a new employee and store their details in the database.

2. **Get Employees**
   - Endpoint: GET /admin/getEmployees
   - Description: Get a list of employees, with an optional filter based on the date of creation.

3. **Check-In**
   - Endpoint: POST /admin/check-in/:employeeId
   - Description: Record a check-in for an employee.

4. **Check-Out**
   - Endpoint: POST /admin/check-out/:employeeId
   - Description: Record a check-out for an employee and calculate the time between check-in and check-out.

## Task Completion

- Implemented endpoints for employee creation, listing employees, and check-in/check-out actions.
- Stored employee information, check-in, and check-out records in a database.
- Calculated and saved data, such as time between check-in and check-out.
- Documentation included with swaggerUi on /api-docs

## Bonus Points

- Added swagger documentation for endpoints
- Added unit tests and integration tests.
- Docker support for running the application in a container.
