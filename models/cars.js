const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        Model: String,
        Manufacturer: String,
        Location: String,
        Image: String,
        YearManufactured: Number,
        EngineVolume: Number,
        TopSpeed: Number,
        Price: Number,
        User:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'

        }
    }
);

module.exports = mongoose.model('Car', CarSchema);