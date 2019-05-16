const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(moment().add(1, 'years').format());
        }
    }
});

module.exports = mongoose.model('Flight', flightSchema);