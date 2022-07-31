const express = require('express');
const port = process.env.port || 3000;

const app = express();

app.listen(port);
console.log(`started on port ${port}`);
app.set('view engine', 'ejs');
app.use(express.static('includes'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(404).render('404');
});
