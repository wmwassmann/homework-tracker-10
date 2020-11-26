DROP DATABASE IF EXISTS nfl_roster;
CREATE database nfl_roster;

USE nfl_roster;
CREATE TABLE team(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
    
);

CREATE TABLE role(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    team_id INT UNSIGNED NOT NULL,
    INDEX team_id (team_id),
    CONSTRAINT fk_team FOREIGN KEY (team_id)
    REFERENCES team(id) ON DELETE CASCADE 
);

CREATE TABLE player(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    number_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id)
    REFERENCES role(id) ON DELETE CASCADE,
    INDEX number_id (number_id),
    CONSTRAINT fk_player FOREIGN KEY (number_id)
    REFERENCES player(id) ON DELETE CASCADE
);


