import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sensor } from '@prisma/client'; // Asegúrate de que Sensor está correctamente importado de tu cliente de Prisma

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async getAllSensors(): Promise<Sensor[]> {
    return this.prisma.sensor.findMany();
  }

  async getSensorById(id: number): Promise<Sensor | null> {
    return this.prisma.sensor.findUnique({
      where: {
        id,
      },
    });
  }

  async createSensor(data: {
    tipo_sensor: string;
    valor: number;
  }): Promise<Sensor> {
    return this.prisma.sensor.create({
      data,
    });
  }

  async updateSensor(
    id: number,
    data: { tipo_sensor: string; valor: number },
  ): Promise<Sensor> {
    return this.prisma.sensor.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteSensor(id: number): Promise<Sensor> {
    return this.prisma.sensor.delete({
      where: {
        id,
      },
    });
  }
}
