import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  task: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: { 
    type: String, 
    required: true,
    trim: true 
  },
  task: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model<IComment>('Comment', CommentSchema);