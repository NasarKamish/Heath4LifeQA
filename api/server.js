const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');

const app = express();

/**  const corsConfig = { origin: true, credentials: true, exposedHeaders: [ "X-Set-Cookie"]}; **/

app.use(cors()); // corsConfig

app.use(cookieParser());

app.use(express.json({ limit: '5MB', extended: true}));

app.get('/', (req, res) => {
    res.send('Health 4 Life API');
});

// routes
app.use('/api/user',require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/areas', require('./routes/area'));
app.use('/api/sites', require('./routes/sites'));
app.use('/api/surveys', require('./routes/surveys'));

app.listen(port, function() {
	console.log('Listening on port: ', port);
});