import { Injectable } from '@nestjs/common';
import { Flight } from './models/flight.model';
import { SearchFlights } from './models/search.model';
import { Airport } from './models/airport.model';
import * as airports from '../mock/airports.json';
import { getRandomInt } from 'src/helper/get-random-int';
import { getRandomChars } from 'src/helper/get-random-chars';
import { Price } from './models/price.model';
import { PriceList } from './models/prices.model';

@Injectable()
export class FlightsService {
  searchFlight(searchFlights: SearchFlights) {
    const flights: Flight[] = [];
    const timeMins = getRandomInt(40, 420);

    flights.push(
      this.generateFlight(
        searchFlights.fromKey,
        searchFlights.toKey,
        searchFlights.forwardDate,
        timeMins,
      ),
    );

    if (searchFlights.backDate) {
      flights.push(
        this.generateFlight(
          searchFlights.toKey,
          searchFlights.fromKey,
          searchFlights.backDate,
          timeMins,
        ),
      );
    }

    return flights;
  }

  generateFlight(
    fromKey: string,
    toKey: string,
    date: string,
    timeMins: number,
  ): Flight {
    const from = airports.find((item) => item.key == fromKey) as Airport;
    const to = airports.find((item) => item.key == toKey) as Airport;
    const [takeoffDate, landingDate] = this.getDateWithTime(date, timeMins);

    const flight = new Flight();
    flight.avaible = getRandomInt(6, 300);
    flight.flightNumber = `${getRandomChars(2)}-${getRandomInt(10, 9999)}`;
    flight.timeMins = timeMins + getRandomInt(-5, 6);
    flight.form = from;
    flight.to = to;
    flight.takeoffDate = takeoffDate;
    flight.landingDate = landingDate;
    flight.prices = new PriceList();

    for (let i = -2; i < 3; i += 1) {
      const isClear = getRandomInt(0, 5) === 1;

      if (!isClear || i === 0) {
        flight.prices[i] = new Price(getRandomInt(40, 900));
      }
    }
    const takeoffDateMs = new Date(date).getTime();
    const currentDateMs = new Date().getTime();

    if (takeoffDateMs - currentDateMs < 0) {
      flight.prices['-1'] = undefined;
    }

    if (takeoffDateMs - currentDateMs - 24 * 60 * 60 * 1000 < 0) {
      flight.prices['-2'] = undefined;
    }

    flight.price = flight.prices[0];

    return flight;
  }

  getDateWithTime(date: string, timeMins: number): string[] {
    const dateMs = new Date(new Date(date).toJSON().substring(0, 10)).getTime();
    const hours = getRandomInt(0, 24) * 60 * 60 * 1000;
    const minutes = getRandomInt(0, 60) * 60 * 1000;
    const timeMinsInMs = timeMins * 60 * 1000;
    const takeoffDate = new Date(dateMs + hours + minutes).toJSON();
    const landingDate = new Date(
      dateMs + hours + minutes + timeMinsInMs,
    ).toJSON();

    return [takeoffDate, landingDate];
  }

  searchCity(name: string): Airport[] {
    console.log(name);
    const nameToLC = name.toLowerCase();
    return airports.filter(
      (airport) =>
        airport.city.toLocaleLowerCase().includes(nameToLC) ||
        airport.country.toLocaleLowerCase().includes(nameToLC) ||
        airport.key.toLocaleLowerCase().includes(nameToLC) ||
        airport.name.toLocaleLowerCase().includes(nameToLC),
    );
  }
}
