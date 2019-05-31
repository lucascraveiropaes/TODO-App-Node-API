# TODO App - Node API

This API was developed as a test for learning a new technology.

## Installation

Copy the repository link, e and run the following command (with git installed in your computer)

```bash
git clone <project-url>
```

After downloaded the project, run the following command to download all dependencies from the project

```bash
npm install
```

## Routes

* General responses for routes:
```json
{
    "status": "bool",
    "message": "string"
}
```

* Route to retrieve all todos

```http
GET /todos
```

Response example:
```json
{
    "status": true,
    "message": "Dados recuperados com sucesso",
    "todos": [{
        "id": 1,
        "title": "Almoço",
        "description": "Sair para o almoço ao 12h",
        "color": "#0ff00f"
    }]
}
```

* Route to insert new todo

```http
POST /todos/new
```

Body request example:

```json
{
    "title": "Almoço",
    "description": "Sair para o almoço ao 12h",
    "color": "#0ff00f"
}
```

Response example:
```json
{
    "status": true,
    "message": "Tarefa adicionada com sucesso",
    "todo_new_id": 1
}
```

* Route to update a todo by id

```http
PUT /todos/update/:id
```

Response example:
```json
{
    "status": true,
    "message": "Tarefa atualizada com sucesso"
}
```

* Route to delete a todo by id

```http
DELETE /todos/delete/:id
```

Response example:
```json
{
    "status": true,
    "message": "Tarefa deletada com sucesso"
}
```


## Contributing
Since this repo is a test just for learning, we will not accept pull requests of any kind. But fell free to fork this repo and use it as base for anything you may need.

## License
[MIT](https://choosealicense.com/licenses/gpl-3.0/)
