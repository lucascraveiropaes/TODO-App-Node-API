import conn from "../dao/database";

class TodoDAO {
    list(callback) {
        try {
            conn.query("SELECT * FROM todos", function (err, result, fields) {
                if (err) return callback(false);
                else return callback(result);
            });
        } catch (e) {
            return callback(false);
        }
    }

    insert(data, callback) {
        try {
            const query = conn.query("INSERT INTO todos SET ?", data, function (err, result, fields) {
                if (err) return callback(false);
                else return callback(result);
            });
        } catch (e) {
            return callback(false);
        }
    }

    update(data, callback) {
        try {
            const id = data.id;
            delete data.id;
            const query = conn.query("UPDATE todos SET ? WHERE ?", [data, { id: id }], function (err, result, fields) {
                if (err) return callback(false);
                else return callback(result);
            });
        } catch (e) {
            return callback(false);
        }
    }

    delete(id, callback) {
        try {
            const query = conn.query("DELETE FROM todos WHERE ?", { id: id }, function (err, result, fields) {
                if (err) return callback(false);
                else return callback(result);
            });
        } catch (e) {
            return callback(false);
        }
    }
}

export default new TodoDAO();
