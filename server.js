// ========================================================================
//                             DEPENDANCIES 
// ========================================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
const prompts = require('./prompts');
const connection = require('./db/connection');
const db = require('./db');
require('console.table');

// Server-side calls

async function mainPrompt() {
    inquirer   
        .prompt(prompts.mainPrompt)
    .then((answer) => {
        switch (answer.choice) {
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View all employees by department':
            viewAllByDepartments();
            break;
        case 'View all employees by role':
            viewAllByRoles();
            break;
        case 'Add department':
            viewOnlyDepartments();
            addNewDepartment();
            break;
        case 'Add role':
            viewOnlyRoles();
            addNewRole();
            break;
        case 'Add employee':
            addNewEmployee();
            break;
        case 'Update employee role':
            updateEmployeeRole();
            break;       
        default:
            return process.exit();
        }
    });
}


async function viewAllTables() {
    const titles = await db.viewAllTables().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();  
}  

async function viewAllEmployees() {
    const titles = await db.viewAllEmployees().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};

async function viewAllByDepartments() {
    const titles = await db.viewAllByDepartments().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};

async function viewAllByRoles() {
    const titles = await db.viewAllByRoles().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};
async function viewOnlyDepartments() {
    const titles = await db.viewOnlyDepartments().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    return titles
};

async function viewOnlyRoles() {
    const titles = await db.viewOnlyRoles().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    return titles 
};

async function updateEmployeeRole() {
    const employeeId = await inquirer.prompt(prompts.askId);

    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the new employee role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log('Role has been updated..')
            prompt();
        });
    });
}

async function addNewDepartment() { 
    inquirer.prompt(prompts.newDepartmentPrompt).then((response) => {
        connection.query(
        `
        INSERT INTO department
            (name)
        VALUES
            ('${response.newDepartmentName}');
        `
        );
        console.log('\n');
        console.log("New department added successfully.");
        console.log('\n');  
        return mainPrompt();
    });
};


async function addNewRole() { 
    inquirer.prompt(prompts.newRolePrompt).then((response) => {
        connection.query(
        `
        INSERT INTO role
            (title, department_id)
        VALUES 
            ('${response.newRoleTitle}', ${response.newDepartmentID});
        `
        );
        console.log('\n');
        console.log("New role added successfully.");
        console.log('\n');  

        return mainPrompt();
    });
};

async function addNewEmployee() {
    const addname = await inquirer.prompt(prompts.askName);
    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the employee role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the employee Manager: '
                }
            ]);
            let managerId;
            let managerName;
            if (manager === 'none') {
                managerId = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managerId = data.id;
                        managerName = data.fullName;
                        console.log(managerId);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            console.log('Employee has been added. Please view all employee to verify...');
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    manager_id: parseInt(managerId)
                },
                (err, res) => {
                    if (err) throw err;
                    prompt();

                }
            );
        });
    });

}

function init() {
    console.log(logo(config).render());
    viewAllTables();
}

init();