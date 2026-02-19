import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKnowledgeDto {
  @ApiProperty({ example: 'Pricing' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Plans start from 999/month.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;
}
