import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LOG_INFO, LOG_TYPE } from '../database-mysql/entity/log';
import { LOG_FULL, TRANSLATION_FULL, UPDATE_DTO } from './class';
import { I18nService } from 'nestjs-i18n';
import * as dayjs from 'dayjs';
import { MicroUserService } from 'src/micro-base/user';
import { TRANSLATION_INFO } from 'src/database-mysql/entity/translation';

@Injectable()
export class TranslationManageService {
  constructor(
    @InjectRepository(LOG_INFO)
    private logDb: Repository<LOG_INFO>,
    @InjectRepository(TRANSLATION_INFO)
    private translationDb: Repository<TRANSLATION_INFO>,
    private i18nService: I18nService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly microUserService: MicroUserService,
  ) { }
  list = async (): Promise<TRANSLATION_FULL[]> => {
    const list = await this.translationDb.find({
      where: {
        inuse: 1
      },
      order: {
        updateTime: 'desc'
      }
    });
    return list as any;
  }
  update = async (id: string, obj: UPDATE_DTO, userId: string): Promise<void> => {
    obj.translationContent = obj.translationContent?.trim() || '';
    const translation = await this.translationDb.findOne({
      where: {
        inuse: 1,
        id,
      },
    });
    if (!translation) {
      throw this.i18nService.translate('数据不存在');
    }
    const [logId] = await this.microUserService.getIds(2);

    await this.entityManager.transaction(async manager => {
      await Promise.all([
        manager.update(TRANSLATION_INFO, id, {
          translationContent: obj.translationContent,
          updateUser: userId,
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
        manager.insert(LOG_INFO, {
          id: logId,
          termbaseId: id,
          oldContent: translation.translationContent,
          newContent: obj.translationContent,
          type: LOG_TYPE.修改内容,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
      ])
    });
  }
  delete = async (id: string, userId: string): Promise<void> => {
    const termbase = await this.translationDb.findOne({
      where: {
        inuse: 1,
        id,
      },
    });
    if (!termbase) {
      throw this.i18nService.translate('数据不存在');
    }
    const [logId] = await this.microUserService.getIds(2);

    await this.entityManager.transaction(async manager => {
      await Promise.all([
        manager.update(TRANSLATION_INFO, id, {
          updateUser: userId,
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
          inuse: 0,
        }),
        manager.create(LOG_INFO, {
          id: logId,
          termbaseId: id,
          oldContent: '',
          newContent: '',
          type: LOG_TYPE.删除,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
      ])
    });
  }
  log = async (id: string): Promise<LOG_FULL[]> => {
    const list = await this.logDb.find({
      where: {
        termbaseId: id,
      },
      order: {
        crateTime: 'desc',
      }
    });
    return list as any;
  }
}
