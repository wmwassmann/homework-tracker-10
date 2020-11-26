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
            player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            role.title AS role,
            player.salary AS Salary,
            team.name AS Team
        FROM 
            player
        LEFT JOIN
            role ON player.id = role.id
		JOIN
			team ON role.team_id = team.id
        ORDER BY 
            role.id;
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
            role.title AS role
        FROM 
            player
        LEFT JOIN
            role ON player.id = role.id
		JOIN
			team ON role.team_id = team.id
        ORDER BY 
            role.id;
        `
        );

    };
    viewAllByRoles() {
        return this.connection.query(
            `
            SELECT
            role.id, 
            role.title AS role,
            player.first_name AS First_Name, 
            player.last_name AS Last_Name,
            player.salary AS Salary,
            team.name AS Team
        FROM 
            player
        LEFT JOIN
            role ON player.id = role.id
		LEFT JOIN
			team ON role.team_id = team.id
        ORDER BY 
            player.role_id;
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
            role.title AS role
        FROM 
            player
        LEFT JOIN
            role ON player.id = role.id
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
    viewOnlyRoles() {
        return this.connection.query(
            `SELECT DISTINCT title FROM role`
        );
    };
    updatePlayerRole(playerID, roleID) {
        return this.connection.query(
            `
            UPDATE player
            SET role_id = ? 
            WHERE player.id = ?;
            `,[playerID, roleID]
        );
    };
}

const db = new DB (connection)
module.exports = db;
