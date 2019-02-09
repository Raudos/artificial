const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initialiseRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());

initialiseRoutes(app);

app.listen(3003, () => {});
