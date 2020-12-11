const connection = require('./connection');
// Holds the database calls.
// class and constructor for DB 

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllTables() {
        return this.connection.query(
            `
        SELECT
            role.id, 
            employee.first_name AS First_Name, 
            employee.last_name AS Last_Name,
            role.title AS role,         
            department.name AS Department
        FROM 
            employee
        LEFT JOIN
            role ON employee.id = role.id
		JOIN
			department ON role.department_id = department.id
        ORDER BY 
            role.id;
        `
        );        
    };
    viewAllByDepartments() {
        return this.connection.query(
            `SELECT 
                department.name AS department, 
                role.title, 
                employee.id, 
                employee.first_name, 
                employee.last_name
            FROM 
                employee
            LEFT JOIN 
                role ON (role.id = employee.role_id)
            LEFT JOIN 
                department ON (department.id = role.department_id)
            ORDER BY department.name;`
        );

    };
    viewAllByRoles() {
        return this.connection.query(
            `SELECT 
                role.title, 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                department.name AS department
            FROM 
                employee
            LEFT JOIN 
                role ON (role.id = employee.role_id)
            LEFT JOIN 
                department ON (department.id = role.department_id)
            ORDER BY role.title;`
        );
    };
    viewAllEmployees() {
        return this.connection.query(
            `SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS department, 
                role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM 
                employee
            LEFT JOIN 
                employee manager on manager.id = employee.manager_id
            INNER JOIN 
                role ON (role.id = employee.role_id)
            INNER JOIN 
                department ON (department.id = role.department_id)
            ORDER BY employee.id;`
        );
    };

    viewByManager() {
        return this.connection.query(
            `SELECT 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager, 
                department.name AS department, 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title
        FROM 
            employee
        LEFT JOIN 
            employee manager on manager.id = employee.manager_id
        INNER JOIN 
            role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
        INNER JOIN 
            department ON (department.id = role.department_id)
        ORDER BY manager;`
 
        );
    }
    viewOnlyDepartments() {
        return this.connection.query(
            `SELECT * FROM 
                department 
            ORDER BY 
                department.id`
        );
    };
    viewOnlyRoles() {
        return this.connection.query(
            `SELECT DISTINCT title FROM role`
        );
    };    
}

const db = new DB (connection)
module.exports = db;
