import  AirPorts  from '../../mongoSchemes/airports.js';
import  Flights  from '../../mongoSchemes/flights.js';

const MEAN_LATITUDE = 38.98124392;

function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

async function startedAirport(){
    const airports = await AirPorts.find({LATITUDE: {$lte: MEAN_LATITUDE}} )
    return airports[Math.floor(Math.random()*(airports.length-1))] 
}

async function findFlights(airportCode){
    const possibleFlights = await Flights.find({ORIGIN_AIRPORT: airportCode});
    return possibleFlights;
}

async function findDestinationAirports(possibleFlights){
    const destinationAirports = []
    await Promise.all(possibleFlights.map(async flight => {
        const airport = await (AirPorts.find({IATA_CODE: flight.DESTINATION_AIRPORT}));
        destinationAirports.push(airport);
    }))
    return destinationAirports;    
}

function moveStratagy(airports){
    const latitudes = airports.map(airport => airport[0].LATITUDE)
    const chosenAirport = airports[argMax(latitudes)][0]
    return chosenAirport;
}

async function findNextPath(airportCode){
    const possibleFlights = await findFlights(airportCode)
    const destinationAirports = await findDestinationAirports(possibleFlights)
    const nextAirport = moveStratagy(destinationAirports)
    return nextAirport;
}

async function findFlightPath(){
    const startAirport = await startedAirport();
    let nextAirport;
    let airportCode = startAirport.IATA_CODE;
    const airportsPath = [];
    airportsPath.push(startAirport)
    do {
        nextAirport = await findNextPath(airportCode)
        airportsPath.push(nextAirport);
        airportCode = nextAirport.IATA_CODE;
    } while (nextAirport.LATITUDE<MEAN_LATITUDE);
    return airportsPath;
}

function printPath(airportsPath){
    airportsPath.forEach(airport => console.log("| ",airport.AIRPORT,": ", airport.LATITUDE, " |"))
}
async function summerizeFlightPath(){
    const airportsPath = await findFlightPath();
    console.log(airportsPath)
    printPath(airportsPath);
    return airportsPath.map(airport => `| ${airport.AIRPORT}: ${airport.LATITUDE}  |`);
}

export default summerizeFlightPath;