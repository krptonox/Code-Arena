import { User } from '../Models/user.model.js';
import { ApiError } from '../Utils/api-error.js';
import { ApiResponse } from '../Utils/api-response.js';
import { asyncHandler } from '../Utils/async-handler.js';
import { z } from 'zod';
import { sendMail, emailVerificationTemplate } from '../Utils/mail.js';


//To check if the user data is valid or not
const userValidation = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),

});


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
  user.emailVerifictionTokenExpires = TokenExpires;

  await user.save({validateBeforeSave:false})
  
  const verificationUrl =
  `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`;

  try {
    await sendMail(
      user.email,
      "Please verify your email",
      emailVerificationTemplate(user.username, verificationUrl)
    )
  }catch(error){
     console.error("MAIL ERROR:", error);
     throw new ApiError(500, 'Failed to send verification email')
  }
  
  return res.status(200).json(new ApiResponse(200, user, 'User created successfully and verification email sent'))
});


export { signUpUser };
