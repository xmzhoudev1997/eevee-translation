import { Body, Controller,  Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TranslationViewService } from './service';
import { QUERY_DTO, TRANSLATION_FULL } from './class';

@ApiTags('translation查询')
@Controller('/translation')
@Controller()
export class TranslationViewController {
  constructor(
    private readonly service: TranslationViewService,
    ) {}

  @Post('/get')
  @ApiOperation({
    summary: '获取翻译'
  })
  @ApiResponse({ type: TRANSLATION_FULL })
  @ApiBody({ type: QUERY_DTO })
  query(@Body() body: QUERY_DTO) {
    return this.service.get(body.content, body.locale);
  }
}
