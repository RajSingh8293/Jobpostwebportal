import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const generateToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const sendResponse = (res, user, statusCode, message) => {
  const token = generateToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  const { password: pass, ...rest } = user._doc; // hide password
  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message,
      user: rest,
      token,
    });
};
