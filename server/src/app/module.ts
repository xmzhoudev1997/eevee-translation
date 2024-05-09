import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { DBMysqlModule } from 'src/database-mysql/module';
import * as path from 'path';
import { TranslationManageModule } from 'src/translation-manage/module';
import { TranslationViewModule } from 'src/translation-view/module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'zh-CN',
      loaderOptions: {
        path: path.join('./' || __dirname, '/locales/'),
      },
      resolvers: [
        new QueryResolver(['locale']),
        new HeaderResolver(['locale']),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DBMysqlModule,
    TranslationManageModule,
    TranslationViewModule,
  ],
})
export class AppModule {}
