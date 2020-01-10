const Appointment = require('../models/Appointment');

module.exports = {
    async show(req, res) {
        const {user_id} = req.headers;

        const appointments = await Appointment.find({user: user_id});

        return res.json(appointments);
    }
}