const app = require("express")();
const { store, index, trash, update, single } = require("../controllers/taskController");

app.post('/', store);
app.get('/all', index);
app.get('/:id', single);
app.put('/:id', update);
app.delete('/:id', trash);

module.exports = app;
