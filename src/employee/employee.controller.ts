import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FetchEmployeeDto } from './dto/fetch-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('resource/v1/protheus/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  getEmployee(@Body() fetchEmployeeDto: FetchEmployeeDto) {
    return this.employeeService.getEmployeeByCpf(fetchEmployeeDto);
  }
}
