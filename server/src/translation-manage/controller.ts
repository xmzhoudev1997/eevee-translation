import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TranslationManageService } from './service';
import { ID_DTO, TRANSLATION_FULL, UPDATE_DTO } from './class';

@ApiTags('translation管理')
@Controller('/manage')
@Controller()
export class TranslationManageController {
  constructor(
    private readonly service: TranslationManageService,
    ) {}

  @Get('/translations')
  @ApiOperation({
    summary: '获取列表'
  })
  @ApiResponse({ type: [TRANSLATION_FULL] })
  list() {
    return this.service.list();
  }
  @Put('/translation/:id')
  @ApiOperation({
    summary: '修改词条'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  @ApiBody({ type: UPDATE_DTO })
  update(@Param() param: ID_DTO, @Body() body: UPDATE_DTO) {
    return this.service.update(param.id, body, '-1');
  }

  @Delete('/translation/:id')
  @ApiOperation({
    summary: '删除词条'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  delete(@Param() param: ID_DTO) {
    return this.service.delete(param.id, '-1');
  }
  @Get('/translation/:id/logs')
  @ApiOperation({
    summary: '查询变更日志'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  log(@Param() param: ID_DTO) {
    return this.service.log(param.id);
  }
}
