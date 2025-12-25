import mongoose, { Schema, Document } from "mongoose";

export interface INode extends Document {
  userId: mongoose.Types.ObjectId;
  nodeId: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color?: string;
  topicId?: string;
  completed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NodeSchema = new Schema<INode>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nodeId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["note", "link", "image", "todo", "tweet"],
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    color: {
      type: String,
    },
    topicId: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
NodeSchema.index({ userId: 1 });

export default mongoose.models.Node ||
  mongoose.model<INode>("Node", NodeSchema);
