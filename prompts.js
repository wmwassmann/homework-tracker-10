const db = require('./db');


module.exports = {
    mainPrompt: [
        {
            name: 'choice',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'View all players',
                'View all players by team',
                'View all players by position',
                'Add team',
                'Add position',
                'Add number',
                'Add player',
                'Update player position',
                'Update player number',
                'Quit'
            ]
        }
    ],
    newTeamPrompt: [
        {
            type: 'input',
            message: 'Input name of new team.',
            name: 'newTeamName'
        }     
    ],
    newPositionPrompt: [
        {
            type: 'input',
            message: 'Input a new position title.',
            name: 'newPositionTitle',
        },
        {
            type: 'input',
            message: 'Input id of new team id.',
            name: 'newTeamID'
        }
    ],
    newNumberPrompt: [
        {
            type: 'input',
            message: 'Input a new number title.',
            name: 'newNumberTitle',
        },
        {
            type: 'input',
            message: 'Input id of new team id.',
            name: 'newNumberID'
        }
    ],


    playerPrompt: [
        {
            type: 'input',
            message: 'Input first name of new player.',
            name: 'newFirstName'
        },
        {
        type: 'input',
        message: 'Input last name of new player.',
        name: 'newLastName'
        },
        {
            type: 'list',
            message: 'What is the new players team?',
            name: 'newTeam',
            choice: []
        },
        {
            type: 'list',
            message: 'What is the new players position?',
            name: 'newPosition',
            choices: []
        },
        {
            type: 'input',
            message: 'What is the new players position id?',
            name: 'newPositionID'
        },
        {
            type: 'input',
            message: 'Input new player salary.',
            name: 'newSalary'
        }
    ],
    updatePositionPrompt: [
        {
            type: 'list',
            message: 'Input the players ID whose position ID you wish to edit.',
            name: 'chosenID',
            choices: []
        }, 
        {
            type: 'list',
            message: 'Input the players new position ID.',
            name: 'updatedPositionID',
            choices: []
        } 
    ],
    updateNumberPrompt: [
        {
            type: 'list',
            message: 'Input the players ID whose number ID you wish to edit.',
            name: 'chosenID',
            choices: []
        }, 
        {
            type: 'list',
            message: 'Input the players new number ID.',
            name: 'updatedNumberID',
            choices: []
        } 
    ]
};
