import { User } from '../Models/user.model.js';
import { ApiError } from '../Utils/api-error.js';
import { ApiResponse } from '../Utils/api-response.js';
import { asyncHandler } from '../Utils/async-handler.js';
import { z } from 'zod';
import { sendMail, emailVerificationTemplate } from '../Utils/mail.js';
import crypto from "crypto";

//To check if the user data is valid or not
const userValidation = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),

});

const generateAccessAndRefreshToken = async (userId) =>{
  try {
    const user = await User.findById(userId);
    const RefreshToken = user.generateRefreshToken();
    const AccessToken = user.generateAccessToken();

    // console.log(RefreshToken," ",AccessToken)

    user.refreshToken = RefreshToken;

    await user.save({validateBeforeSave: false})
    return {AccessToken, RefreshToken}
  }
  catch(error){
    console.log(error);
     throw new ApiError(500,"Error in generating Access and Refresh Token")
  }
}


const signUpUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;


  const IsUserDataValid = userValidation.safeParse({ username, email, password });
 
  if(!IsUserDataValid.success){
    return res.json(new ApiResponse(400, null, 'Invalid user data', IsUserDataValid.error.format()));
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(409, 'User already exists');
  }
  

  const user = await User.create({
    username,
    email,
    password,
    role,
    isEmailVerified:false,
  });



  const {unHashedToken, hashedToken, TokenExpires} = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpires = TokenExpires;

  await user.save({validateBeforeSave:false})
  
  const verificationUrl =
  `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`;

  try {
    await sendMail(
      user.email,
      "Please verify your email",
      "Hola Amigo! Please verify your email by clicking the button below.",
      emailVerificationTemplate(user.username, verificationUrl)
    )
  }catch (error) {
    console.error("FULL ERROR:");
    console.error(error);
}

  const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

  if(!createdUser){
    throw new ApiError(500, "Error creating user");
  }
  
  return res.status(200).json(new ApiResponse(200, [user, createdUser], 'User created successfully and verification email sent'))
});



const verifyEmail = asyncHandler(async(req, res) => {
  const {token} = req.params;
 
  if(!token){
    throw new ApiError(400, "No Token from Your Email")
  }

  console.log("Raw Token:", token);

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
  console.log("Hashed Token:", hashedToken);

  const user = await User.findOne({
    emailVerificationToken:hashedToken,

    // emailVerificationTokenExpires:{
    //   $gt:Date.now()
    // },
  })

  console.log("User:", user);

  if(!user){
    throw new ApiError(404, "Email Not Verified");
  }
  

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });

  console.log("User after verification:", user);

  return res.status(200).json(
    new ApiResponse(
    200,
    null,
    "Your email has been verified successfully. You can now log in."
)
  )
})



const loginUser = asyncHandler(async(req, res)=>{
   const {email, password} = req.body;
   console.log("Login Request Body:", req.body);

   if (!email || !password){
    throw new ApiError(400, "Email and password are required");
  }

   const user = await User.findOne({email})

   console.log("User found:", user)

   if(!user){
    throw new ApiError(404, "Email not found")
   }

   if(!user.isEmailVerified){
    throw new ApiError(403, "Please verify your email first.");
  } 

  const IsPasswordCorrect = await user.isPasswordCorrect(password);
  if(!IsPasswordCorrect){
    throw new ApiError(401,"Password or email is Incorrect Bitch!");
  }

  console.log("No error till here")

  const {AccessToken, RefreshToken} = await generateAccessAndRefreshToken(user._id);

  console.log("After generation")

  // console.log(AccessToken, RefreshToken)

  await user.save({validateBeforeSave: false});
  
  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
  .cookie("accessToken", AccessToken, options)
  .cookie("refreshToken", RefreshToken, options)
  .json(new ApiResponse(200, user, "LoginSuccesfull without Access and Refresh Token Bitch!"))

})



const logoutUser = asyncHandler(async(req,res)=>{
  const {email} = req.body;

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "User not found")
  }

  console.log("User data we got:", user)

 await User.findOneAndUpdate(user._id,{
    $set:{
      refreshToken:null
    },
  },
  {
    new:true
  }
);

console.log("User after logout:", user)

const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
  .clearCookie('refreshToken',options)
  .clearCookie('accessToken',options)
  .json(new ApiResponse(200, null, "User logged out successfully"))
})


const getCurrentUser = asyncHandler(async(req,res)=>{
  return res.status(200)
  .json(new ApiResponse(200, req.user,"Current user fetched successfully"))
})

const resendEmailVerification = asyncHandler(async(req,res)=>{
   
  const user = await User.findById(req.user._id);
  console.log("User data we got:", user)

  if(!user){
    throw new ApiError(404, "User not found");
  }

  if(user.isEmailVerified){
    throw new ApiError(409, "Email is already verified");
  }

  const {unHashedToken, hashedToken, TokenExpires} = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpires = TokenExpires;
  
  await user.save({validateBeforeSave:false});

  const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`;
  
  try {await sendMail(
    user.email,
    "Please verify your Email By resendEmailVerification url",
    "hola Amigo phirse kr email verify",
    emailVerificationTemplate(user.username, verificationUrl)
  )}
  catch(error){
    throw new ApiError(500, "Error sending verification email", [error.message], error.stack)
  }

  return res.status(200).json(new ApiResponse(200, null, "Verification email resent successfully"))
  
})

export { signUpUser, verifyEmail, loginUser, logoutUser, getCurrentUser, resendEmailVerification };
