import { User } from '../Models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import jwt from 'jsonwebtoken';

export const verifyJwt = asyncHandler(async (req,res,next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");

    console.log("Cookies:", req.cookies);
    console.log("Authorization:", req.headers.authorization);

    if(!token){
        throw new ApiError(401, "Unauthorized request");
    }

    try{
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user  = await User.findById(decodeToken?._id).select( "-password -createdAt -updatedAt -refreshToken -__v");

        if(!user){
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401, "Unauthorized request");
    }
})

