import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true, enum: MessageRole })
  role: MessageRole;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Index for fast session lookups
MessageSchema.index({ sessionId: 1, createdAt: 1 });
