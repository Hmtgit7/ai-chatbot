import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Chat')
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * POST /api/messages
   * Main flow: send a message, get an AI reply.
   * If sessionId is omitted → new chat session is created automatically.
   */
  @Post('messages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a message and receive an AI reply' })
  async sendMessage(@Body() dto: CreateMessageDto) {
    const { sessionId, reply } = await this.chatService.sendMessage(dto);
    return { success: true, sessionId, reply };
  }

  /**
   * GET /api/sessions
   * List all chat sessions.
   */
  @Get('sessions')
  @ApiOperation({ summary: 'List all chat sessions' })
  async listSessions() {
    const data = await this.chatService.listSessions();
    return { success: true, data };
  }

  /**
   * GET /api/sessions/:sessionId/messages
   * Get full message history for a session.
   */
  @Get('sessions/:sessionId/messages')
  @ApiParam({ name: 'sessionId', description: 'UUID of the chat session' })
  @ApiOperation({ summary: 'Get full message history for a chat session' })
  async getSessionMessages(@Param('sessionId') sessionId: string) {
    const data = await this.chatService.getSessionMessages(sessionId);
    return { success: true, sessionId, data };
  }

  /**
   * DELETE /api/sessions/:sessionId
   * Delete a session and all its messages.
   */
  @Delete('sessions/:sessionId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'sessionId', description: 'UUID of the chat session' })
  @ApiOperation({ summary: 'Delete a chat session and all its messages' })
  async deleteSession(@Param('sessionId') sessionId: string) {
    await this.chatService.deleteSession(sessionId);
    return { success: true, message: 'Session deleted.' };
  }
}
