import express      from "express";
import bodyParser   from "body-parser";
import todos        from "./src/routes/todos";

const app = express();
const PORT = 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.use( todos );

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
