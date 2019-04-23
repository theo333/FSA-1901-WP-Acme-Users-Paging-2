const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../dist', 'main.js'))
);

app.get('/style.css', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../client', 'style.css'))
);

app.get('/', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../client', 'index.html'))
);

app.listen(port, () => console.log(`listening on port ${port}`));
