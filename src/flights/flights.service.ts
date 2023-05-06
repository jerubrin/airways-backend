import { Injectable } from '@nestjs/common';
import { Flight } from './models/flight.model';
import { SearchFlights } from './models/search.model';
import { Airport } from './models/airport.model';
import * as airports from '../mock/airports.json';
import * as airportsMain from '../mock/airports-main.json';
import { getRandomInt } from 'src/helper/get-random-int';
import { getRandomChars } from 'src/helper/get-random-chars';
import { Price } from './models/price.model';
import { Flights } from './models/flights.model';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

@Injectable()
export class FlightsService {
  searchFlight(searchFlights: SearchFlights) {
    const flights: Flight[] = [];
    const timeMins = getRandomInt(40, 420);

    const forwardFlight = this.generateFlight(
      searchFlights.fromKey,
      searchFlights.toKey,
      searchFlights.forwardDate,
      timeMins,
    );
    flights.push(forwardFlight);

    if (searchFlights.backDate) {
      const backFlight = this.generateFlight(
        searchFlights.toKey,
        searchFlights.fromKey,
        searchFlights.backDate,
        timeMins,
      );
      flights.push(backFlight);
    }

    flights[0].otherFlights = this.generateOtherFlights(
      flights[0],
      new Date(),
      searchFlights.backDate
        ? new Date(flights[1].takeoffDate)
        : new Date('May 02 2053'),
      new Date(searchFlights.forwardDate),
      timeMins,
    );

    if (flights[1]) {
      flights[1].otherFlights = this.generateOtherFlights(
        flights[1],
        new Date(flights[0].takeoffDate),
        new Date('May 02 2053'),
        new Date(searchFlights.backDate),
        timeMins,
      );
    }

    return flights;
  }

  generateFlight(
    fromKey: string,
    toKey: string,
    date: string,
    timeMins: number,
    approximatePrice?: number,
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
    // flight.prices = new PriceList();

    flight.price = approximatePrice
      ? new Price(
          getRandomInt(
            approximatePrice < 60 ? 40 : approximatePrice - 20,
            approximatePrice + 20,
          ),
        )
      : new Price(getRandomInt(40, 900));

    // const takeoffDateMs = new Date(date).getTime();
    // const currentDateMs = new Date().getTime();

    // if (takeoffDateMs - currentDateMs < 0) {
    //   flight.prices['-1'] = undefined;
    // }

    // if (takeoffDateMs - currentDateMs - 24 * 60 * 60 * 1000 < 0) {
    //   flight.prices['-2'] = undefined;
    // }

    // flight.price = flight.prices[0];

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

  searchCity(name?: string): Airport[] {
    if (!name) {
      return airportsMain;
    }

    const nameToLC = name.toLowerCase();
    return airports
      .filter(
        (airport) =>
          airport.city.toLocaleLowerCase().includes(nameToLC) ||
          airport.country.toLocaleLowerCase().includes(nameToLC) ||
          airport.key.toLocaleLowerCase().includes(nameToLC) ||
          airport.name.toLocaleLowerCase().includes(nameToLC),
      )
      .slice(0, 10);
  }

  generateOtherFlights(
    flight: Flight,
    leftDate: Date,
    rightDate: Date,
    date: Date,
    timeMins: number,
  ) {
    const flights = new Flights();

    for (let i = -5; i < 6; i += 1) {
      const leftDateIsOK =
        new Date(flight.takeoffDate).getTime() -
          leftDate.getTime() +
          DAY_IN_MS * i >
        0;

      const rightDateIsOK =
        new Date(flight.landingDate).getTime() -
          rightDate.getTime() +
          DAY_IN_MS * i <
        0;

      const justRandom = getRandomInt(0, 4) !== 3;

      if (leftDateIsOK && rightDateIsOK && justRandom && i !== 0) {
        flights[i] = this.generateFlight(
          flight.form.key,
          flight.to.key,
          new Date(date.getTime() + DAY_IN_MS * i).toJSON(),
          timeMins,
          flight.price.eur,
        );
      } else {
        flights[i] = undefined;
      }
    }

    return flights;
  }
}
