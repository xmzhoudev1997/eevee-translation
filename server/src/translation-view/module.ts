import { Module } from '@nestjs/common';
import { TranslationViewController } from './controller';
import { TranslationViewService } from './service';
import { MicroBaseModule } from 'src/micro-base/module';
import { DBRedisModule } from 'src/database-redis/module';
import { GPTService } from './gpt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TRANSLATION_INFO } from 'src/database-mysql/entity/translation';

@Module({
  imports: [MicroBaseModule, DBRedisModule, TypeOrmModule.forFeature([TRANSLATION_INFO]),],
  controllers: [TranslationViewController],
  providers: [TranslationViewService, GPTService],
  exports: [GPTService],
})
export class TranslationViewModule {}