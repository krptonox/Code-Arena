import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200X200`,
        localPath: '',
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    role: {
      type: String,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },

    emailOtp: String,
    emailOtpExpires: Date,
  },
  {
    timestamps: true,
  },
);


//password hashing before saving the user to database
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next;
  
  this.password = await bcrypt.hash(this.password,10)
  next;
})





export const User = mongoose.model('User', userSchema);


