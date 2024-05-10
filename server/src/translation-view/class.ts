
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TERMBASE_SIMPLE } from 'src/micro-base/class';

export class GET_DTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  locale: string;
}

export class MORE_DTO {
  @IsNotEmpty()
  @ApiProperty()
  contents: string[];
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  locale: string;
}

export class MULTI_DTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsNotEmpty()
  @ApiProperty()
  locales: string[];
}

export class SUGGEST_DTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}

export class TRANSLATION_FULL {
  @ApiProperty()
  content: string;
  @ApiProperty()
  locale: string;
  @ApiProperty()
  translationContent: string;
  @ApiProperty({ type: [TERMBASE_SIMPLE] })
  termbases: TERMBASE_SIMPLE[];
}