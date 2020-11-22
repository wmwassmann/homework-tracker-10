const connection = require('./connection');

//class and constructor for DB 
class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllTables() {
        return this.connection.query(
            `
        SELECT
            position.id, 
            player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            position.title AS position,
            player.salary AS Salary,
            team.name AS Team
        FROM 
            player
        LEFT JOIN
            position ON player.id = position.id
		JOIN
			team ON position.team_id = team.id
        ORDER BY 
            position.id;
        `
        );        
    };
    viewAllByTeams() {
        return this.connection.query(
            `
        SELECT 
            player.id AS ID, 
            team.name AS Team_Name,
			player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            position.title AS position
        FROM 
            player
        LEFT JOIN
            position ON player.id = position.id
		JOIN
			team ON position.team_id = team.id
        ORDER BY 
            position.id;
        `
        );

    };
    viewAllByPositions() {
        return this.connection.query(
            `
            SELECT
            position.id, 
            position.title AS position,
            player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            player.salary AS Salary,
            team.name AS Team
        FROM 
            player
        LEFT JOIN
            position ON player.id = position.id
		LEFT JOIN
			team ON position.team_id = team.id
        ORDER BY 
            player.position_id;
        `
        );
    };
    viewAllPlayers() {
        return this.connection.query(
            `
        SELECT
            player.id, 
            player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            position.title AS position
        FROM 
            player
        LEFT JOIN
            position ON player.id = position.id
        ORDER BY 
            player.id;
        `
        );
    };
    viewOnlyTeams() {
        return this.connection.query(
            `SELECT * FROM team ORDER BY team.id`
        );
    };
    viewOnlyPositions() {
        return this.connection.query(
            `SELECT DISTINCT title FROM position`
        );
    };
    updatePlayerPosition(playerID, positionID) {
        return this.connection.query(
            `
            UPDATE player
            SET position_id = ? 
            WHERE player.id = ?;
            `,[playerID, positionID]
        );
    };
}

const db = new DB (connection)
module.exports = db;
