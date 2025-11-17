import { Feedback } from '../models/Feedback.js';
import { User } from '../models/User.js';
import * as messages from '../utils/feedbackConstants.js';
import mongoose from 'mongoose';

export const saveFeedback = async (req, res) => {
  try {
    const { contentType, isPositive } = req.body;

    if (!contentType) {
      res.status(400).json({
        success: false,
        message: messages.CONTENT_TYPE_REQUIRED,
      });
      return;
    }

    if (!messages.SECTIONS.includes(contentType)) {
      res.status(400).json({
        success: false,
        message: messages.INVALID_CONTENT_TYPE,
      });
      return;
    }

    if (typeof isPositive !== 'boolean') {
      res.status(400).json({
        success: false,
        message: messages.IS_POSITIVE_BOOLEAN_REQUIRED,
      });
      return;
    }

    const feedback = new Feedback({
      user: req.user.id,
      contentType,
      isPositive,
    });

    await feedback.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { feedbacks: feedback._id }
    });

    res.status(201).json({
      success: true,
      message: messages.FEEDBACK_SAVED_SUCCESS,
      data: feedback,
    });
  } catch (error) {
    console.error('Feedback save error:', error);

    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({
        success: false,
        message: errorMessages.join(', '),
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: messages.FEEDBACK_SAVE_ERROR,
    });
  }
};

export const getLastFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id)
        }
      },

      { $sort: { createdAt: -1 } },

      {
        $group: {
          _id: "$contentType",
          doc: { $first: "$$ROOT" }
        }
      },

      { $replaceRoot: { newRoot: "$doc" } }
    ]);

    await Feedback.populate(feedback, {
      path: "user",
      select: "name email",
    });

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("Get feedback error:", error);
    res.status(500).json({
      success: false,
      message: messages.FEEDBACK_FETCH_ERROR,
    });
  }
};
