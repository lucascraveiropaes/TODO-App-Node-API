import express          from "express";
import bodyParser       from "body-parser";
import todos            from "../dao/database";
import todoController   from '../controllers/todos';
import { validateTodo } from "../helpers/utils";

const router = express.Router();

const app = express();

router.get("/todos", todoController.getTodos);
router.post("/todos/new", todoController.addTodo);
router.put("/todos/update/:id", todoController.updateTodo);
router.delete("/todos/delete/:id", todoController.deleteTodo);

module.exports = router;
