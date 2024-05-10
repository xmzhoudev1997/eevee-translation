import { Injectable } from '@nestjs/common';
import { MicroTermbaseService } from 'src/micro-base/termbase';
import { TRANSLATION_FULL } from './class';
import { I18nService } from 'nestjs-i18n';
import { GPTService } from './gpt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TRANSLATION_INFO } from 'src/database-mysql/entity/translation';
import * as dayjs from 'dayjs';
import { MicroUserService } from 'src/micro-base/user';

@Injectable()
export class TranslationViewService {
  constructor(
    readonly microTermbaseService: MicroTermbaseService,
    private readonly microUserService: MicroUserService,
    readonly gptService: GPTService,
    readonly i18nService: I18nService,
    @InjectRepository(TRANSLATION_INFO)
    private translationDb: Repository<TRANSLATION_INFO>,
  ) { }
  translateOne = async (content: string, locale: string, userId: string): Promise<TRANSLATION_FULL> => {
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
    const translateList = await this.translationDb.find({
      where: {
        inuse: 1,
        content,
        locale,
      },
      order: {
        updateTime: 'desc'
      }
    });
    if (translateList.length) {
      obj.translationContent = translateList[0].translationContent;
      const [id] = await this.microUserService.getIds(1);
      if (!translateList.find(d => d.updateUser === userId)) {
        await this.translationDb.insert({
          id,
          locale,
          content,
          translationContent: obj.translationContent,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updateUser: userId,
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
          inuse: 1,
        })
      }
      return obj;
    } else {
      obj.translationContent = await this.gptService.translation(content, locale, obj.termbases);
      const [id] = await this.microUserService.getIds(1);
      await this.translationDb.insert({
        id,
        locale,
        content,
        translationContent: obj.translationContent,
        createUser: userId,
        crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        updateUser: userId,
        updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        inuse: 1,
      })
      return obj;
    }
  }
}
