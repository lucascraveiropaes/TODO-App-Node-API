import mysql from "mysql";

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_app"
});

conn.connect((err) => {
    if (err) throw err;
});

export default conn;
