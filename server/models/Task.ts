import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'Todo' | 'InProgress' | 'InReview' | 'Done';
  deadline: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  priority: { type: String, enum: ['P0', 'P1', 'P2'], default: 'P1' },
  status: { type: String, enum: ['Todo', 'InProgress', 'InReview', 'Done'], default: 'Todo' },
  deadline: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);