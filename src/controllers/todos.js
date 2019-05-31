import TodoDAO          from "../dao/todoDAO";
import { validateTodo } from "../helpers/utils";

class TodosController {
    getTodos(req, res) {
        TodoDAO.list((todos) => {
            if (todos === false) {
                return res.status(500).send({
                    status: false,
                    message: "Erro no servidor"
                });
            }

            res.status(200).send({
                status: true,
                message: "Dados recuperados com sucesso",
                todos: todos
            });
        })
    }

    addTodo(req, res) {
        try {
            let data = req.body;
            let response = {
                status: false,
                message: "Erro no servidor"
            }

            const todoValidation = validateTodo(req.body);

            if (todoValidation !== true) {
                response.message = todoValidation;
            } else if (!req.body.backgroundColor) {
                data.backgroundColor = "#FFF";
                response.status = true;
            } else {
                response.status = true;
            }

            if (response.status === false) {
                return res.status(400).send(response);
            }

            TodoDAO.insert(data, (status) => {
                if (status !== false) {
                    response.message = "Tarefa adicionada com sucesso";
                    response.todo_new_id = status.insertId;
                    return res.status(200).send(response);
                }

                response.status = false;
                return res.status(500).send(response);
            });
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }

    updateTodo(req, res) {
        try {
            const id = parseInt(req.params.id);
            let data = req.body;
            let response = {
                status: false,
                message: "Tarefa não encontrada"
            }

            if (!data.title && !data.description && !data.backgroundColor) {
                response.message = "Objeto inválido";
            } else {
                response.status = true;
                data.id = id;
            }

            if (response.status === false)
                return res.status(400).send(response);

            TodoDAO.update(data, (status) => {
                if (status !== false && status.affectedRows > 0) {
                    response.message = "Tarefa atualizada com sucesso";
                    return res.status(200).send(response);
                }

                response.status = false;
                return res.status(500).send(response);
            });
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }

    deleteTodo(req, res) {
        try {
            const id = parseInt(req.params.id);
            let statusCode = 500;
            let response = {
                status: false,
                message: "Não foi possível deletar tarefa"
            }

            TodoDAO.delete(id, (status) => {
                if (status !== false && status.affectedRows > 0) {
                    response.message = "Tarefa deletada com sucesso";
                    response.status = true;
                    statusCode = 200;
                }

                return res.status(statusCode).send(response);
            });
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }
}

export default new TodosController();
