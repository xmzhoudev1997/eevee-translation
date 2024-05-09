import { Injectable } from '@nestjs/common';
import { TERMBASE_SIMPLE } from 'src/micro-base/class';
import { MicroTermbaseService } from 'src/micro-base/termbase';
import { TRANSLATION_FULL } from './class';
import { I18nService } from 'nestjs-i18n';
import * as dayjs from 'dayjs';

@Injectable()
export class TranslationViewService {
  constructor(
    readonly microTermbaseService: MicroTermbaseService,
    readonly i18nService: I18nService,
  ) { }
  get = async (content: string, locale: string): Promise<TRANSLATION_FULL> => {
    content = content.trim();
    locale = locale.trim();
    if (!content) {
      throw this.i18nService.translate('内容不能为空');
    }
    if (!locale) {
      throw this.i18nService.translate('语种不能为空');
    }
    const obj: TRANSLATION_FULL = {
      content,
      translationContent: '',
      locale,
      termbases: await this.microTermbaseService.queryTermbases(content, locale),
    }
    return obj;
  }
}
