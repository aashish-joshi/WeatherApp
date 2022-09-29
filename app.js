import express from 'express';

import {getIcon, getJson} from './routes/backendRoutes';

const port = process.env.port || 3000;

const app = express();

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static('includes'));

// Frontend Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});

// Backend APIs

app.get('/api/weather/json', getJson());
app.get('/api/weather/icon', getJson());


// Catchall route for 404
app.use((req, res) => {
    res.status(404).render('404');
});
