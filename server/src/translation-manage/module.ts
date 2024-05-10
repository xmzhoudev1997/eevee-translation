import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOG_INFO } from 'src/database-mysql/entity/log';
import { TRANSLATION_INFO } from 'src/database-mysql/entity/translation';
import { TranslationManageController } from './controller';
import { TranslationManageService } from './service';
import { MicroBaseModule } from 'src/micro-base/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LOG_INFO, TRANSLATION_INFO]),
    MicroBaseModule,
  ],
  controllers: [TranslationManageController],
  providers: [TranslationManageService]
})
export class TranslationManageModule { }