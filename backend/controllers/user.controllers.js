import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import { generateToken, sendResponse } from "../middleware/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const deleteAllUsers = async (req, res) => {
  try {
    const users = await User.deleteMany();
    if (!users) {
      res.status(400).json({
        message: "Users not deleted",
        success: false,
      });
      return;
    }
    res.status(201).json({
      message: "Users are deleted succefully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with deleting multiple users",
      error,
    });
  }
};
// register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, location, phone, role } = req.body;
  try {
    if (!username) {
      return res.status(422).json({ message: "Username is required !" });
    }
    if (!email) {
      return res.status(422).json({ message: "Email is required !" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required !" });
    }
    if (!role) {
      return res.status(422).json({ message: "Role is required !" });
    }

    // existing user
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists !" });
    }

    // password hash
    const hashPassword = bcryptjs.hashSync(password, 8);

    const userdata = new User({
      username,
      email,
      password: hashPassword,
      role,
      phone,
      location,
    });

    const user = await userdata.save();

    sendResponse(res, user, 201, "Register logged In Successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with registration",
      error,
    });
  }
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res
      .status(404)
      .json({ success: false, message: "Password is required !" });
  }
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required !" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User does not exists",
      });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      res.status(400).send({
        success: false,
        message: "Invalid data !",
      });
    }

    sendResponse(res, user, 200, "Logged in successfully");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with login",
      error,
    });
  }
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "User logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with logged Out",
    });
  }
});

// profile
export const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});

// update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email, location, phone } = req.body;
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const userUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          email,
          location,
          phone,
        },
      },
      { new: true }
    );
    sendResponse(res, userUpdate, 200, "User updated successfully");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});

// delete account himself user
export const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);

    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    await deleteOnCloudinary(user?.profileImage?.public_id);
    await User.findByIdAndDelete(user);

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});

// update profile image
export const updateProfileImage = asyncHandler(async (req, res) => {
  try {
    let user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const filename = req.file?.path;
    await deleteOnCloudinary(user?.profileImage?.public_id);

    const image = await uploadOnCloudinary(filename);

    const userUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          profileImage: {
            public_id: image.public_id,
            url: image.url,
          },
        },
      },
      { new: true }
    );
    sendResponse(res, userUpdate, 200, "Profile image updated successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
});

// change password
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  // const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  const isPasswordCorrect = bcryptjs.compareSync(oldPassword, user.password);

  if (!isPasswordCorrect) {
    res.status(400).json({
      success: false,
      message: "Password incorrect!",
    });
  }
  const hashPassword = bcryptjs.hashSync(newPassword, 8);
  user.password = hashPassword;
  await user.save({ validateBeforeSave: false });

  sendResponse(res, user, 200, "Password changed successfully");
});

// delete user account by admin
export const deleteUserAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log("user :", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    await deleteOnCloudinary(user?.profileImage?.public_id);
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "User deleted successfully",
      deleteUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});

// admin get users
export const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({
        success: false,
        message: "Data not found",
      });
      return;
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
});

// get user account by id admin
export const getUserAccountById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});
