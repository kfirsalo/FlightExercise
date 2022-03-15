const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Flights = require('../../mongoSchemes/flights')
const AirPorts = require('../../mongoSchemes/airports')

mongoose.connect('mongodb://localhost:27017/database2')
const MEAN_LATITUDE = 38.98124392;

app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyParser.json())

function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

async function StartedAirport(){
    const airports = await AirPorts.find({LATITUDE: {$lte: MEAN_LATITUDE}} )
    return airports[Math.floor(Math.random()*(airports.length-1))] 
}

async function FindFlights(airportCode){
    const possibleFlights = await Flights.find({ORIGIN_AIRPORT: airportCode});
    return possibleFlights;
}

async function FindDestinationAirports(possibleFlights){
    const destinationAirports = []
    // for (flight in possibleFlights){
    //     airport = await (AirPorts.find({IATA_CODE: flight.DESTINATION_AIRPORT}));
    //     destinationAirports.push(airport);
    // }
    await Promise.all(possibleFlights.map(async flight => {
        airport = await (AirPorts.find({IATA_CODE: flight.DESTINATION_AIRPORT}));
        destinationAirports.push(airport);
    }))
    return destinationAirports;    
}

function MoveStratagy(airports){
    // console.log(airports[0][0].LATITUDE)
    const latitudes = airports.map(airport => airport[0].LATITUDE)
    // console.log("latitude:", latitudes)
    const chosenAirport = airports[argMax(latitudes)][0]
    return chosenAirport;
}
async function FindFlightPath(){
    const startAirport = await StartedAirport();
    let airportCode = startAirport.IATA_CODE;
    let runAlgorithm    = true;
    const airportsPath = [];
    airportsPath.push(startAirport)
    while (runAlgorithm){
        possibleFlights = await FindFlights(airportCode)
        // console.log("possible flights", possibleFlights)
        destinationAirports =await FindDestinationAirports(possibleFlights)
        // console.log("destination airports", destinationAirports)
        nextAirport = MoveStratagy(destinationAirports)
        airportsPath.push(nextAirport);
        airportCode = nextAirport.IATA_CODE;
        runAlgorithm = (nextAirport.LATITUDE>MEAN_LATITUDE) ? false : true;
    }
    airportsPath.forEach(airport => console.log("| ",airport.AIRPORT,": ", airport.LATITUDE, " |"))
    return airportsPath.map(airport => `| ${airport.AIRPORT}: ${airport.LATITUDE}  |`)
}
// app.post('/api/delete', async (req, res) => {
// 	const { record } = req.body
// 	console.log(record, '/api/delete')

// 	const response = await Todo.deleteOne({ record })

// 	console.log(response, '/api/delete repsonse')

// 	res.json({ status: 'ok' })
// })

// app.post('/api/modify', async (req, res) => {
// 	const { old: oldTitle, new: newTitle } = req.body

// 	const response = await Todo.updateOne(
// 		{
// 			record: oldTitle
// 		},
// 		{
// 			$set: {
// 				record: newTitle
// 			}
// 		}
// 	)

// 	console.log(response)

// 	res.json({ status: 'ok' })
// })

// app.get('/api/get', async (req, res) => {
// 	const records = await Todo.find({})
// 	// console.log('Response => ', records)
// 	res.json(records)
// })

// app.post('/api/create', async (req, res) => {
// 	const record = req.body
// 	console.log(record)

// 	// * CREATE (_C_RUD)
// 	const response = await Todo.create(record)

// 	console.log(response)

// 	res.json({ status: 'ok' })
// })

app.listen(13371, '127.0.0.1', () => {
	console.log('Server up')
})

module.exports = FindFlightPath;