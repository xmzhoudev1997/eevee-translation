import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TranslationViewService } from './service';

@Controller()
export class TranslationViewMicroController {
  constructor(
    private readonly service: TranslationViewService,
  ) { }
  @MessagePattern('getTranslation')
  get([content, locale, userId]: string[]) {
    return this.service.translateOne(content, locale, userId);
  }
}
