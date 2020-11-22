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
        case 'View all players':
            viewAllPlayers();
            break;
        case 'View all players by team':
            viewAllByTeams();
            break;
        case 'View all players by position':
            viewAllByPositions();
            break;
        case 'Add team':
            viewOnlyTeams();
            addNewTeam();
            break;
        case 'Add position':
            viewOnlyPositions();
            addNewPosition();
            break;
        case 'Add player':
            addNewPlayer();
            break;
        case 'Add player':
            addNewNumber();
            break;
        case 'Update player position':
            updatePlayerPosition();
            break;
        case 'Update player number':
            updatePlayerNumber();
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

async function viewAllPlayers() {
    const titles = await db.viewAllPlayers().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};

async function viewAllByTeams() {
    const titles = await db.viewAllByTeams().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};

async function viewAllByPositions() {
    const titles = await db.viewAllByPositions().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    mainPrompt();
};
async function viewOnlyTeams() {
    const titles = await db.viewOnlyTeams().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    return titles
};

async function viewOnlyPositions() {
    const titles = await db.viewOnlyPositions().catch(err => console.log(err));
    console.log('\n');
    console.table(titles);
    return titles 
};

async function updatePlayerPosition() {
    const players = await db.viewAllPlayers();
    console.log(players);
    const playerChoices = players.map(({ First_Name, Last_Name, id }) => ({ 
        name: `${First_Name} ${Last_Name}`,
        value: id
        })
    );
    const { playerID } = await inquirer.prompt([
        {
        type: 'list',
        name: 'playerID',
        message: 'Which player would you like to update?',
        choices: playerChoices
        }
    ]);

    const positions = await db.viewOnlyPositions();
    const positionChoice = positions.map(({ title, id }) => ({ 
        name: title,
        value: id
        })
    );
    const answer = await inquirer.prompt([
        {
        type: 'list',
        name: 'positionID',
        message: 'Which position would you like to update?',
        choices: positionChoice
        }
    ]);
    await db.updatePlayerPosition(playerID, answer.positionID);
        console.log('\n');
        console.log("Updated position successfully.");
        console.log('\n');  
        return mainPrompt();
};

async function updatePlayerNumber() {
    const players = await db.viewAllPlayers();
    console.log(players);
    const playerChoices = players.map(({ First_Name, Last_Name, id }) => ({ 
        name: `${First_Name} ${Last_Name}`,
        value: id
        })
    );
    const { playerID } = await inquirer.prompt([
        {
        type: 'list',
        name: 'playerID',
        message: 'Which player would you like to update?',
        choices: playerChoices
        }
    ]);

    const positions = await db.viewOnlyPositions();
    const numberChoice = positions.map(({ title, id }) => ({ 
        name: title,
        value: id
        })
    );
    const answer = await inquirer.prompt([
        {
        type: 'list',
        name: 'numberID',
        message: 'Which number would you like to update?',
        choices: numberChoice
        }
    ]);
    await db.updatePlayerNumber(playerID, answer.numberID);
        console.log('\n');
        console.log("Updated number successfully.");
        console.log('\n');  
        return mainPrompt();
};

async function addNewTeam() { 
    inquirer.prompt(prompts.newTeamPrompt).then((response) => {
        connection.query(
        `
        INSERT INTO team
            (name)
        VALUES
            ('${response.newTeamName}');
        `
        );
        console.log('\n');
        console.log("New team added successfully.");
        console.log('\n');  
        return mainPrompt();
    });
};


async function addNewPosition() { 
    inquirer.prompt(prompts.newPositionPrompt).then((response) => {
        connection.query(
        `
        INSERT INTO position
            (title, team_id)
        VALUES 
            ('${response.newPositionTitle}', ${response.newTeamID});
        `
        );
        console.log('\n');
        console.log("New position added successfully.");
        console.log('\n');  

        return mainPrompt();
    });
};

async function addNewNumber() { 
    inquirer.prompt(prompts.newNumberPrompt).then((response) => {
        connection.query(
        `
        INSERT INTO number
            (title, team_id)
        VALUES 
            ('${response.newNumberTitle}', ${response.newNumberID});
        `
        );
        console.log('\n');
        console.log("New number added successfully.");
        console.log('\n');  

        return mainPrompt();
    });
};

async function addNewPlayer() {
    const teams = await viewOnlyTeams();
    const positions = await viewOnlyPositions();
    prompts.newPlayerPrompt[2].choices = teams.map(team => ({ 
        name: team.name, 
        value: team.id 
        })
    );
    prompts.newPlayerPrompt[3].choices = positions.map(position => ({ 
        name: position.title, 
        value: position.id
        })
    );
    inquirer.prompt(prompts.newPlayerPrompt).then((response) => {
        connection.query(
            ` 
            INSERT INTO player
                (first_name, last_name, salary, position_id, manager_id)
            VALUES
                ('${response.newFirstName}', '${response.newLastName}',  ${response.newSalary}, ${response.newPositionID}, 1);
            `

            );            
        connection.query(
            ` 
            INSERT INTO position
                (title, team_id)
            VALUES 
                ('${response.newPosition}', ${response.newTeam});
            `
        ); 
        console.log('\n');
        console.log("New player added successfully.");
        console.log('\n');  
        return mainPrompt();
    });
};

function init() {
    console.log(logo(config).render());
    viewAllTables();
}

init();