export function validateTodo(todo) {
    if (!todo.title) {
        return "Informe um título para a tarefa";
    } else if (!todo.description) {
        return "Informe uma descrição para a tarefa";
    }

    return true;
}
