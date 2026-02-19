import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KnowledgeDocument = Knowledge & Document;

@Schema({ timestamps: true })
export class Knowledge {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const KnowledgeSchema = SchemaFactory.createForClass(Knowledge);
