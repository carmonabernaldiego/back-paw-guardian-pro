import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { SensorService } from './sensor.service'; // Asegúrate de tener un servicio que coincida con el nombre
import { Sensor } from '@prisma/client'; // Asegúrate de que Sensor está correctamente importado de tu cliente de Prisma

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getAllSensors() {
    return this.sensorService.getAllSensors();
  }

  @Post()
  async createSensor(@Body() data: { tipo_sensor: string; valor: number }) {
    return this.sensorService.createSensor({
      tipo_sensor: data.tipo_sensor,
      valor: data.valor,
    });
  }

  @Get(':id')
  async getSensorById(@Param('id') id: string) {
    const sensorFound = await this.sensorService.getSensorById(Number(id));

    if (!sensorFound) {
      throw new NotFoundException('El sensor no existe');
    } else {
      return sensorFound;
    }
  }

  @Delete(':id')
  async deleteSensor(@Param('id') id: string) {
    try {
      return await this.sensorService.deleteSensor(Number(id));
    } catch (error) {
      throw new NotFoundException('El sensor no existe');
    }
  }

  @Put(':id')
  async updateSensor(
    @Param('id') id: string,
    @Body() data: { tipo_sensor: string; valor: number },
  ) {
    try {
      return await this.sensorService.updateSensor(Number(id), data);
    } catch (error) {
      throw new NotFoundException('El sensor no existe');
    }
  }
}
