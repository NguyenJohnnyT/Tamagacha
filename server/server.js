const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
require('dotenv').config();
const sequelize = require('./config/connection');
const cron = require('node-cron');

const { getAllUserTama, createUserTamaArr, userTamaUpdate } = require('./utils/passive');
const { schedule } = require('./utils/upkeep_schedule');

const app = express();
const PORT = process.env.PORT || 3005;

// -- check if production and hand URL to passive.js -- \\
const dev = process.env.NODE_ENV !== 'production'
const SERVER = dev ? `http://localhost:${PORT}` : 'https://jtn-tamagacha.herokuapp.com'

// -- cron -- \\
//!Tweak schedule based on game balance
cron.schedule(schedule, () => {
    getAllUserTama(SERVER)
    .then((data) => {
        userTamaUpdate(createUserTamaArr(data), SERVER)
    })
})

// -- middleware -- \\
// app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes); 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
