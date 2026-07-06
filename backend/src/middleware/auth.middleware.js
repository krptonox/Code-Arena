import {User} from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import jwt from 'jsonwebtoken';

export const verifyJwt = asyncHandler(async (req,res,next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");

    if(!token){
        throw new ApiError(401, "Unauthorized request");
    }

    try{
        const decodeToken = jwt.verify(token, Process.env.ACCESS_TOKEN_SECRET);

        const user  = await User.findbyId(decodeToken?._id).select( "-password -createdAt -updatedAt -refreshToken -__v");

        if(!user){
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401, "Unauthorized request");
    }
})

