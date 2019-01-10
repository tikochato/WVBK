const mysql = require('mysql2/promise');
const db_config = require("../db_config.json")
let credenciales = {
		host: db_config.host,
	  user: db_config.user,
		password: db_config.password,
	  database: db_config.db
}
module.exports = () => {
	return mysql.createConnection(credenciales);
}
