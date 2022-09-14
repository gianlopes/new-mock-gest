import { Controller, Post, Body } from '@nestjs/common';
import { FetchEmployeeDto } from './dto/fetch-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('resource/v1/protheus/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  getEmployee(@Body() fetchEmployeeDto: FetchEmployeeDto) {
    return this.employeeService.getEmployeeByCpf(fetchEmployeeDto);
  }
}
