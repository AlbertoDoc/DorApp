const express = require('express')

const SessionController = require('./controllers/SessionController');
const AppointmentController = require('./controllers/AppointmentController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.get('/dashboard', DashboardController.show);

module.exports = routes;
