const Appointment = require('../models/Appointment');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const {time} = req.query;

        const appointment = await Appointment.find({time: time});
        
        return res.json(appointment);
    },

    async store(req, res) {
        const {time} = req.body;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({error: 'User does not exists'})
        }

        if(time>24 || time<0){
            return res.status(400).json({error: 'Invalid time of appointment'})
        }

        const appointment = await Appointment.create({
            time,
            user: user_id,
        });
        return res.json(appointment);
    }
};