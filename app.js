const express = require('express');
const port = process.env.port || 3000;

const app = express();

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static('includes'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Catchall route for 404
app.use((req, res) => {
    res.status(404).render('404');
});
