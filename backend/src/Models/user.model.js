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
     
    emailVerificationToken: {
      type: String,
    },

    emailVerifictionTokenExpires: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },

    
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



userSchema.methods.generateTemporaryToken = function(){
  const unHashedToken = crypto.randomBytes(20).toString('hex')

  const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex')

  const TokenExpires = Date.now() + 10 * 60 * 1000 //10 mins

  return { unHashedToken, hashedToken, TokenExpires }
}




export const User = mongoose.model('User', userSchema);


