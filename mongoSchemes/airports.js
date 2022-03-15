const mongoose = require('mongoose')
						

const AirportSchema = new mongoose.Schema({
	IATA_CODE: { type: String, required: true },
    AIRPORT: { type: String, required: true },
    CITY: { type: String, required: true },
    STATE: { type: String, required: true },
    COUNTRY: { type: String, required: true },
    LATITUDE: { type: Number, required: true },
    LONGITUDE: { type: Number, required: true },
})

const model = mongoose.model('airports', AirportSchema)

module.exports = model