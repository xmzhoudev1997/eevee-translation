import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TranslationViewService } from './service';
import { GET_DTO, SUGGEST_DTO, TRANSLATION_FULL } from './class';
import { GPTService } from './gpt';

@ApiTags('translation查询')
@Controller('/translation')
@Controller()
export class TranslationViewController {
  constructor(
    private readonly service: TranslationViewService,
    private readonly gptService: GPTService,
    ) {}

  @Post('/get')
  @ApiOperation({
    summary: '获取单个翻译'
  })
  @ApiResponse({ type: TRANSLATION_FULL })
  @ApiBody({ type: GET_DTO })
  get(@Body() body: GET_DTO) {
    return this.service.translateOne(body.content, body.locale, '-1');
  }

  @Post('/suggest')
  @ApiOperation({
    summary: 'gpt回答问题'
  })
  @ApiResponse({ type: String })
  @ApiBody({ type: SUGGEST_DTO })
  suggest(@Body() body: SUGGEST_DTO) {
    return this.gptService.answer([body.content], []);
  }
}
