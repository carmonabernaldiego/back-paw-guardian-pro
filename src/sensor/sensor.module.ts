import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';

@Module({
  controllers: [SensorController],
  providers: [SensorService],
  imports: [PrismaModule],
})
export class SensorModule {}
