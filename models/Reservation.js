const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bike: {
        type: Schema.Types.ObjectId,
        ref: 'bikes'
    },
    reservation_date: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);