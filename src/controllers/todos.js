import todos from "../dao/database";

class TodosController {
    getTodos(req, res) {
        return res.status(200).send({
            status: true,
            message: "Dados recuperados com sucesso",
            todos: todos
        });
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
            } else if (!req.body.color) {
                data.color = "#FFF";
                response.status = true;
            } else {
                response.status = true;
            }

            if (response.status === false) {
                return res.status(400).send(response);
            }

            data.id = todos.length + 1;
            todos.push(data);

            response.message = "Tarefa adicionada com sucesso";
            response.todos = todos;

            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }

    updateTodo(req, res) {
        try {
            const id = parseInt(req.params.id);
            const index = todos.findIndex(todo => todo.id === id);
            let todo = req.body;
            let response = {
                status: false,
                message: "Tarefa não encontrada"
            }

            if (index < -1)
                return res.status(400).send(response);

            if (!todo.title && !todo.description && !todo.color) {
                response.message = "Objeto inválido";
            } else {
                response.status = true;
            }

            if (response.status === false)
                return res.status(400).send(response);

            todo = Object.assign(todos[index], todo);

            todos[index] = todo;
            response.message = "Tarefa atualizada com sucesso";
            response.todos = todos;

            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }

    deleteTodo(req, res) {
        try {
            const id = parseInt(req.params.id);
            const newTodos = todos.filter(todo => todo.id !== id);
            let status = 500;
            let response = {
                status: false,
                message: "Tarefa não encontrada"
            }

            if (newTodos.length >= todos.length) {
                status = 400;
                response.message = "Não foi possível deletar tarefa";
            } else {
                status = 200;
                response.status = true;
                response.message = "Tarefa deletada com sucesso";
                response.todos = newTodos;
            }

            return res.status(status).send(response);
        } catch (e) {
            console.log(e);
            return res.status(500);
        }
    }
}

export default new TodosController();
