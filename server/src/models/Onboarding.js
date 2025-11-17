import mongoose, { Schema } from 'mongoose';


const onboardingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    followedAssets: {
      type: [String],
      default: [],
      validate: {
        validator: (assets) => {
          return assets.every((asset) => typeof asset === 'string' && asset.length > 0);
        },
        message: 'Followed assets must be an array of valid strings',
      },
    },
    investorType: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive', 'trader'],
      required: [true, 'Investor type is required'],
    },
    contentPreferences: {
      news: {
        type: Boolean,
        default: true,
      },
      prices: {
        type: Boolean,
        default: true,
      },
      meme: {
        type: Boolean,
        default: true,
      },
      insight: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

onboardingSchema.index({ userId: 1 });

export const Onboarding = mongoose.model('Onboarding', onboardingSchema);

