import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { SearchFlights } from './models/search.model';
import { Flight } from './models/flight.model';
import { Airport } from './models/airport.model';

@Controller('search')
@ApiTags('Flights and airports')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Search Flights' })
  @ApiResponse({ status: 201, type: [Flight] })
  @Post('flight')
  search(@Body() flights: SearchFlights): Flight[] {
    return this.flightsService.searchFlight(flights);
  }

  @ApiOperation({ summary: 'Search Airport' })
  @ApiResponse({ status: 201, type: Airport })
  @ApiQuery({
    name: 'q',
    description:
      'Search string for searching airports (/search/airport?q=Amste)',
    example: 'Amste',
  })
  @Get('airport')
  searchCity(@Query() params: { q: string }): Airport[] {
    return this.flightsService.searchCity(params.q || '');
  }
}
