import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import * as messages from '../utils/authConstants.js'

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: messages.SIGN_PROVIDE_DATA,
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: messages.EXISTING_USER,
      });
      return;
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      success: true,
      message: messages.USER_CREATED,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      console.log('v',errorMessages)
      res.status(400).json({
        success: false,
        message: errorMessages.join(', '),
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: messages.USER_CREATING_ERROR,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: messages.LOGIN_PROVIDE_DATA,
      });
      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: messages.INVALID_DATA,
      });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: messages.INVALID_DATA,
      });
      return;
    }

    const token = generateToken(user._id.toString(), user.email);

    res.status(200).json({
      success: true,
      message: messages.LOGIN_SUCCESS,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: messages.LOGIN_ERROR,
    });
  }
};
