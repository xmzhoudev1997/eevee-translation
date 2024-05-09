import { ApiProperty } from "@nestjs/swagger";

export class TERMBASE_SIMPLE {
    @ApiProperty()
    content: string;
    @ApiProperty()
    translateContent: string;
  }