import { faker } from '@faker-js/faker/locale/pt_BR';
import * as CPF from 'cpf';
// default import is broken
import * as moment from 'moment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { removeAccents, strToUpperAndClean } from 'src/utils/name-utils';
import { FetchEmployeeDto } from './dto/fetch-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async employee(
    employeeWhereUniqueInput: Prisma.EmployeeWhereUniqueInput
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: employeeWhereUniqueInput,
    });
  }

  async employees(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }): Promise<Employee[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createEmployee(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async updateEmployee(params: {
    where: Prisma.EmployeeWhereUniqueInput;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    const { where, data } = params;
    return this.prisma.employee.update({
      data,
      where,
    });
  }

  async deleteEmployee(
    where: Prisma.EmployeeWhereUniqueInput
  ): Promise<Employee> {
    return this.prisma.employee.delete({
      where,
    });
  }

  async getEmployeeByCpf(data: FetchEmployeeDto): Promise<Employee | null> {
    if (!CPF.isValid(data.cpf) && data.cpf !== '11111111111')
      throw new BadRequestException('CPF inválido');

    const employee = await this.prisma.employee.findUnique({
      where: {
        CPF: data.cpf,
      },
    });

    if (employee) return employee;

    return this.createFakeEmployee(data.cpf);
  }

  async createFakeEmployee(cpf: string): Promise<Employee> {
    const referenceDate = moment().subtract(180, 'days').toDate();
    const fullName = faker.name.fullName();
    const firstName = removeAccents(fullName.split(' ')[0]);
    const lastName = removeAccents(fullName.split(' ')[1]);
    return this.prisma.employee.create({
      data: {
        CPF: cpf,
        A_NOME: strToUpperAndClean(fullName),
        DADM: moment(faker.date.past(5, referenceDate)).format('DDMMYYYY'),
        FONE: faker.phone.number('#####-####'),
        MAE: faker.name.fullName({ sex: 'female' }).toUpperCase(),
        MAIL: faker.internet.email(firstName, lastName, 'emailfalso.br'),
        NASC: moment(faker.date.birthdate({ min: 18, mode: 'age' })).format(
          'DDMMYYYY'
        ),
        PAI: faker.name.fullName({ sex: 'male' }).toUpperCase(),
        RG: faker.random.numeric(7),
        SEXO: faker.helpers.arrayElement(['M', 'F']),
      },
    });
  }
}
