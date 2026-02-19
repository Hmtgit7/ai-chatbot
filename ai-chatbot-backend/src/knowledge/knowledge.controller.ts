import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KnowledgeService } from './knowledge.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';

@ApiTags('Knowledge')
@Controller('api/knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new knowledge entry' })
  async create(@Body() dto: CreateKnowledgeDto) {
    const knowledge = await this.knowledgeService.create(dto);
    return {
      success: true,
      message: 'Knowledge entry added successfully.',
      data: knowledge,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List all knowledge entries' })
  async findAll() {
    const data = await this.knowledgeService.findAll();
    return { success: true, data };
  }
}
