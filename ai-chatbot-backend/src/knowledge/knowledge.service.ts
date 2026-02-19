import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knowledge, KnowledgeDocument } from './schemas/knowledge.schema';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';

@Injectable()
export class KnowledgeService {
  private readonly logger = new Logger(KnowledgeService.name);

  constructor(
    @InjectModel(Knowledge.name)
    private readonly knowledgeModel: Model<KnowledgeDocument>,
  ) {}

  async create(dto: CreateKnowledgeDto): Promise<Knowledge> {
    const knowledge = new this.knowledgeModel(dto);
    const saved = await knowledge.save();
    this.logger.log(`Knowledge entry created: "${dto.title}"`);
    return saved;
  }

  async findAll(): Promise<Knowledge[]> {
    return this.knowledgeModel.find().sort({ createdAt: -1 }).exec();
  }

  /**
   * Aggregate all knowledge entries into a single formatted string
   * for injection into the AI system prompt.
   */
  async getKnowledgeContext(): Promise<string> {
    const entries = await this.findAll();
    if (!entries.length) return '';

    return entries.map((e) => `[${e.title}]: ${e.content}`).join('\n');
  }
}
