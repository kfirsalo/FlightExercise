import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
	Year: { type: Number, required: true },
    MONTH: { type: Number, required: true },
    DAY: { type: Number, required: true },
    DAY_OF_WEEK: { type: Number, required: true },
    AIRLINE: { type: String, required: true },
    FLIGHT_NUMBER: { type: Number, required: true },
    AIRLINE: { type: String, required: true },
    TAIL_NUMBER: { type: String, required: true },
    ORIGIN_AIRPORT: { type: String, required: true },
    DESTINATION_AIRPORT: { type: String, required: true },
    SCHEDULED_DEPARTURE: { type: Number },
    DEPARTURE_TIME: { type: Number },
    DEPARTURE_DELAY: { type: Number},
    TAXI_OUT: { type: Number},
    WHEELS_OFF: { type: Number},
    SCHEDULED_TIME: { type: Number },
    ELAPSED_TIME: { type: Number },
    AIR_TIME: { type: Number },
    DISTANCE: { type: Number },
    WHEELS_ON: { type: Number },
    TAXI_IN: { type: Number },
    SCHEDULED_ARRIVAL: { type: Number },
    ARRIVAL_TIME: { type: Number},
    ARRIVAL_DELAY: { type: Number },
    DIVERTED: { type: Number },
    CANCELLED: { type: Number },
    CANCELLATION_REASON: { type: String },
    AIR_SYSTEM_DELAY: { type: Number },
    SECURITY_DELAY: { type: Number },
    AIRLINE_DELAY: { type: Number },
    LATE_AIRCRAFT_DELAY: { type: Number },
    WEATHER_DELAY: { type: Number },
    Price: { type: Number }
})

const model = mongoose.model('flights', FlightSchema)

export default model;															
