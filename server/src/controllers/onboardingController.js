import { Onboarding } from '../models/Onboarding.js';
import * as messages from '../utils/onboardingConstants.js';

export const saveOnboarding = async (req, res) => {
  try {
    const { followedAssets, investorType, contentPreferences } = req.body;
    if (!investorType) {
      res.status(400).json({
        success: false,
        message: messages.INVESTOR_TYPE_REQUIRED,
      });
      return;
    }

    if (!['conservative', 'moderate', 'aggressive', 'trader'].includes(investorType)) {
      res.status(400).json({
        success: false,
        message: messages.INVALID_INVESTOR_TYPE,
      });
      return;
    }

    const normalizedAssets = followedAssets
      ? [...new Set(followedAssets.map((asset) => asset.toUpperCase().trim()))]
      : [];


    const onboarding = await Onboarding.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        followedAssets: normalizedAssets,
        investorType,
        contentPreferences,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: messages.ONBOARDING_PREFERENCES_SAVED,
      data: onboarding,
    });
  } catch (error) {
    console.error('Onboarding save error:', error);

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
      message: messages.ONBOARDING_SAVE_ERROR,
    });
  }
};

export const getOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user.id });

    if (!onboarding) {
      res.status(404).json({
        success: false,
        message: messages.ONBOARDING_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error('Get onboarding error:', error);
    res.status(500).json({
      success: false,
      message: messages.ONBOARDING_FETCH_ERROR,
    });
  }
};
