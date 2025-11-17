import mongoose, { Schema } from 'mongoose';
import { SECTIONS } from '../utils/feedbackConstants.js';

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: SECTIONS,
    },

    isPositive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);





