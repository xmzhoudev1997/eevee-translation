import { Injectable } from '@nestjs/common';
import { TERMBASE_SIMPLE } from 'src/micro-base/class';
import { RedisService } from '@liaoliaots/nestjs-redis';

export const LOCALE_DESC_MAP = {
  'zh-CN': '中文',
  'en-US': '英文',
  'ja-JP': '日文',
  'ko-KR': '韩文',
};



@Injectable()
export class GPTService {
  private _runningTaskNum = 0;
  constructor(
    readonly redisService: RedisService,
  ) {
  }
  translation = async (content: string, locale: string, termbases: TERMBASE_SIMPLE[]): Promise<string> => {
    const result = await this.answer(
      [
        `帮我把下面JSON中的content属性的内容翻译成${LOCALE_DESC_MAP[locale] || locale}，并把翻译后的结果通过原有的JSON结构返回给我，不要给我额外内容`,
        `如果你无法翻译content属性的内容，请把我给你的JSON原样返回给我，不要给我额外内容`,
        ...termbases.map(d => `给你一个术语翻译，可以把'${d.content}'翻译成'${d.translateContent}'`),
        `content属性的内容中出现术语都需要翻译`,
        `JSON内容为：${JSON.stringify({ content })}`,
      ],
      []);
      return JSON.parse(result).content;
  }
  translationsByLocale = async (contents: string[], locale: string, termbases: TERMBASE_SIMPLE[]): Promise<string[]> => {
    const result = await this.answer(
      [
        `开始下面内容前请忽略我之前的要求`,
        `帮我把下面JSON数组中的内容翻译成${LOCALE_DESC_MAP[locale] || locale}，并把翻译后的结果通过JSON数组返回给我，不要给我额外内容`,
        `如果你无法翻译JSON数组中某项的内容，请把那一项原有内容插入到返回的JSON数组中，不要给我额外内容`,
        ...termbases.map(d => `给你一个术语翻译，可以把'${d.content}'翻译成'${d.translateContent}'`),
        `JSON数组中的内容中出现术语都需要翻译`,
        `JSON数组为：${JSON.stringify(contents)}`,
      ],
      []);
      return JSON.parse(result);
  }
  answer = async (userContents: string[], systemContents: string[]): Promise<string> => {
    const config = JSON.parse(await this.redisService.getClient().get('EEVEE_TRANSLATION_CONFIG_OPENAI'));
    await this.awaitRunning(config.taskNum);
    const result = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.token
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0,
        messages: [
          ...systemContents.map(d => ({
            role: 'user',
            content: d,
          })),
          ...userContents.map(d => ({
            role: 'user',
            content: d,
          }))
        ]
      })
    })
      .then((res) => {
        if (res.status !== 200) {
          throw '请求失败';
        }
        return res.json();
      }).catch(() => {
        throw '请求失败';
      }).finally(() => {
        this._runningTaskNum -= 1;
      });
    return result?.choices?.[0]?.message?.content;
  }
  awaitRunning = (taskNum: number = 10) => new Promise((resolve) => {
    if (this._runningTaskNum < taskNum) {
      this._runningTaskNum += 1;
      resolve(1);
      return;
    }
    const timer = setInterval(() => {
      if (this._runningTaskNum < taskNum) {
        this._runningTaskNum += 1;
        resolve(1);
        clearInterval(timer);
      }
    }, 1000);
  })
}
