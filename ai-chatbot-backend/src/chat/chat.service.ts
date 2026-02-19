import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  Message,
  MessageDocument,
  MessageRole,
} from './schemas/message.schema';
import {
  ChatSession,
  ChatSessionDocument,
} from './schemas/chat-session.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { AiService } from '../ai/ai.service';
import { KnowledgeService } from '../knowledge/knowledge.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(ChatSession.name)
    private readonly sessionModel: Model<ChatSessionDocument>,
    private readonly aiService: AiService,
    private readonly knowledgeService: KnowledgeService,
  ) {}

  async sendMessage(dto: CreateMessageDto): Promise<{
    sessionId: string;
    reply: string;
  }> {
    // 1. Resolve or create session
    const sessionId = dto.sessionId ?? uuidv4();
    await this.upsertSession(sessionId);

    // 2. Save user message to DB
    await this.saveMessage(sessionId, MessageRole.USER, dto.message);
    this.logger.log(`[${sessionId}] User: ${dto.message.substring(0, 60)}...`);

    // 3. Fetch full conversation history for this session
    const history = await this.getSessionHistory(sessionId);

    // 4. Fetch knowledge context
    const knowledgeContext = await this.knowledgeService.getKnowledgeContext();

    // 5. Generate AI reply (history already includes the new user message)
    const reply = await this.aiService.generateReply(history, knowledgeContext);

    // 6. Save AI reply to DB
    await this.saveMessage(sessionId, MessageRole.ASSISTANT, reply);
    this.logger.log(`[${sessionId}] Assistant: ${reply.substring(0, 60)}...`);

    // 7. Update session message count + auto-title from first message
    await this.updateSessionMeta(sessionId, dto.message);

    return { sessionId, reply };
  }

  async getSessionMessages(sessionId: string): Promise<Message[]> {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session)
      throw new NotFoundException(`Session "${sessionId}" not found.`);

    return this.messageModel.find({ sessionId }).sort({ createdAt: 1 }).exec();
  }

  async listSessions(): Promise<ChatSession[]> {
    return this.sessionModel.find().sort({ updatedAt: -1 }).exec();
  }

  async deleteSession(sessionId: string): Promise<void> {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session)
      throw new NotFoundException(`Session "${sessionId}" not found.`);

    await Promise.all([
      this.messageModel.deleteMany({ sessionId }),
      this.sessionModel.deleteOne({ sessionId }),
    ]);
    this.logger.log(`Session deleted: ${sessionId}`);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private async saveMessage(
    sessionId: string,
    role: MessageRole,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({ sessionId, role, content });
    return message.save();
  }

  private async getSessionHistory(sessionId: string) {
    const messages = await this.messageModel
      .find({ sessionId })
      .sort({ createdAt: 1 })
      .exec();

    return messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
  }

  private async upsertSession(sessionId: string): Promise<void> {
    await this.sessionModel.findOneAndUpdate(
      { sessionId },
      { $setOnInsert: { sessionId, title: 'New Chat', messageCount: 0 } },
      { upsert: true, new: true },
    );
  }

  private async updateSessionMeta(
    sessionId: string,
    firstUserMessage: string,
  ): Promise<void> {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session) return;

    const update: Record<string, unknown> = {
      $inc: { messageCount: 2 }, // user + assistant
    };

    // Auto-set title from first user message (first 50 chars)
    if (session.messageCount === 0) {
      update['$set'] = {
        title: firstUserMessage.substring(0, 50),
      };
    }

    await this.sessionModel.updateOne({ sessionId }, update);
  }
}
