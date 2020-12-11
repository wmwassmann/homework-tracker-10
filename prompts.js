const db = require('./db');


module.exports = {
    mainPrompt: [
        {
            name: 'choice',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by role',
                'Add department',
                'Add role',              
                'Add employee',
                'Update employee role',
                'Terminate employee',               
                'Quit'
            ]
        }
    ],
    newDepartmentPrompt: [
        {
            type: 'input',
            message: 'Input name of new department.',
            name: 'newDepartmentName'
        }     
    ],
    newRolePrompt: [
        {
            type: 'input',
            message: 'Input a new role title.',
            name: 'newRoleTitle',
        },
        {
            type: 'input',
            message: 'Input id of new department id.',
            name: 'newDepartmentID'
        }
    ],

    employeePrompt: [
        {
            type: 'input',
            message: 'Input first name of new employee.',
            name: 'newFirstName'
        },
        {
        type: 'input',
        message: 'Input last name of new employee.',
        name: 'newLastName'
        },
        {
            type: 'list',
            message: 'What is the new employees department?',
            name: 'newDepartment',
            choice: []
        },
        {
            type: 'list',
            message: 'What is the new employees role?',
            name: 'newRole',
            choices: []
        },
        {
            type: 'input',
            message: 'What is the new employees role id?',
            name: 'newRoleID'
        },
        {
            type: 'input',
            message: 'Input new employee salary.',
            name: 'newSalary'
        }
    ],
    updateRolePrompt: [
        {
            type: 'list',
            message: 'Input the employees ID whose role ID you wish to edit.',
            name: 'chosenID',
            choices: []
        }, 
        {
            type: 'list',
            message: 'Input the employees new role ID.',
            name: 'updatedRoleID',
            choices: []
        } 
    ],
    askName: [
        {
            name: "first",
            type: "input",
            message: "Enter the first name: "
        },
        {
            name: "last",
            type: "input",
            message: "Enter the last name: "
        }
    ],
    askId: [
        {
            name: "name",
            type: "input",
            message: "What is the employe ID?:  "
        }
    ],
    removeEmployee: [
        {
            name: "first",
            type: "input",
            message: "Enter the employee ID you want to remove:  "
        }
    ]   
};
