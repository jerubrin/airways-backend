import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Test API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test API, return "Everything is fine!"' })
  @ApiResponse({ status: 200, type: String })
  @Get()
  getTest(): string {
    return this.appService.getTest();
  }
}
