import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatSession, ChatSessionSchema } from './schemas/chat-session.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from '../ai/ai.module';
import { KnowledgeModule } from '../knowledge/knowledge.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: ChatSession.name, schema: ChatSessionSchema },
    ]),
    AiModule,
    KnowledgeModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
