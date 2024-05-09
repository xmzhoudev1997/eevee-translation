import { Module } from '@nestjs/common';
import { TranslationViewController } from './controller';
import { TranslationViewService } from './service';
import { MincroBaseModule } from 'src/micro-base/module';

@Module({
  imports: [MincroBaseModule],
  controllers: [TranslationViewController],
  providers: [TranslationViewService]
})
export class TranslationViewModule {}