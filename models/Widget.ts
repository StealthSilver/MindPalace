import mongoose, { Schema, Document } from "mongoose";

export interface IWidget extends Document {
  userId: mongoose.Types.ObjectId;
  widgetId: string;
  type: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

const WidgetSchema = new Schema<IWidget>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    widgetId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
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
    data: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
WidgetSchema.index({ userId: 1 });

export default mongoose.models.Widget ||
  mongoose.model<IWidget>("Widget", WidgetSchema);
