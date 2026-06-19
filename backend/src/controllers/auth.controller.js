import { User } from '../Models/user.model.js';
import { ApiError } from '../Utils/api-error.js';
import { ApiResponse } from '../Utils/api-response.js';
import { asyncHandler } from '../Utils/async-handler.js';

const signUpUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified,
  });

  return res.json(new ApiResponse(201, user, 'User is Registerd Successfully'));
});

export { signUpUser };
