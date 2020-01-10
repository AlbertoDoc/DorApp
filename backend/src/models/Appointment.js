const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    time: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = (mongoose.model('Appointment', AppointmentSchema));