import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly model: string;
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.model =
      this.configService.get<string>('openai.model') ?? 'gpt-4o-mini';

    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is not configured in environment variables.',
      );
    }

    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Generate an AI reply using conversation history + knowledge context.
   * @param conversationHistory - Full chat history for the session
   * @param knowledgeContext - Aggregated knowledge base content
   */
  async generateReply(
    conversationHistory: ChatMessage[],
    knowledgeContext: string,
  ): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(knowledgeContext);

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];

      this.logger.debug(
        `Sending ${messages.length} messages to OpenAI (model: ${this.model})`,
      );

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const reply = response.choices[0]?.message?.content;

      if (!reply) {
        throw new InternalServerErrorException(
          'OpenAI returned an empty response.',
        );
      }

      this.logger.debug(`OpenAI reply received (${reply.length} chars)`);
      return reply.trim();
    } catch (error) {
      this.logger.error('OpenAI API error', error);
      if (error instanceof InternalServerErrorException) throw error;
      throw new InternalServerErrorException(
        `AI service error: ${(error as Error).message}`,
      );
    }
  }

  private buildSystemPrompt(knowledgeContext: string): string {
    const base = `You are a helpful AI assistant. Be concise, friendly, and accurate.`;

    if (!knowledgeContext.trim()) {
      return base;
    }

    return `${base}

Use the following knowledge base to answer questions when relevant. If the answer is not in the knowledge base, use your general knowledge but be transparent about it.

--- KNOWLEDGE BASE ---
${knowledgeContext}
--- END KNOWLEDGE BASE ---`;
  }
}
