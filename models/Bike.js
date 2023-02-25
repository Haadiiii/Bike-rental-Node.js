const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BikeSchema = new schema({

    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    bike_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    daily_rate: {
        type: Number,
        required: true
    },
    color: {
        type:Array,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    
});

module.exports = Bike = mongoose.model('bike', BikeSchema);