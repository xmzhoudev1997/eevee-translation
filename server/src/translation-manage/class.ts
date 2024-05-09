
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LOG_TYPE } from 'src/database-mysql/entity/log';

export class ID_DTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}
export class UPDATE_DTO {
  @IsString()
  @ApiProperty()
  translationContent: string;
}

export class USER_INFO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatar: string;
}

export class TRANSLATION_FULL {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  translationContent: string;
  @ApiProperty()
  locale: string;
  @ApiProperty({ type: USER_INFO })
  createUser: USER_INFO;
  @ApiProperty()
  createTime: string;
  @ApiProperty({ type: USER_INFO })
  updateUser: USER_INFO;
  @ApiProperty()
  updateTime: string;
}

export class LOG_FULL {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: LOG_TYPE })
  type: LOG_TYPE;
  @ApiProperty()
  oldContent: string;
  @ApiProperty()
  newContent: string;
  @ApiProperty({ type: USER_INFO })
  createUser: USER_INFO;
  @ApiProperty()
  createTime: string;
}