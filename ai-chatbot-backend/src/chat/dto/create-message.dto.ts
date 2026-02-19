import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello, what are your pricing plans?' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;

  @ApiPropertyOptional({
    example: 'session_abc123',
    description:
      'Session ID for multi-chat. If omitted, a new session is created.',
  })
  @IsString()
  @IsOptional()
  sessionId?: string;
}
