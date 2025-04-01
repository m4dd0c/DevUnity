import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import DevUnityError from "../utils/DevUnityError";
import User from "../model/User";
import UserDTO from "../dto/UserDTO";
import UsernameValidation from "../utils/UsernameValidation";
import getDataUri from "../utils/getDataUri";
import mailer from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import {
  contactUsHTMLCreator,
  resetHTMLCreator,
  verificationHTMLCreator,
} from "../utils/mailer.html";
import Room from "../model/Room";
import DevUnityRes from "../utils/DevUnityRes";

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { input, password } = req.body;
    if (!input || !password)
      next(new DevUnityError(400, "Please provide all required fields."));
    // check user available with given input
    const user = await User.findOne({
      $or: [
        {
          username: input,
        },
        {
          email: input,
        },
      ],
    }).select("+password");
    if (!user)
      return next(
        new DevUnityError(
          401,
          "No user found with this Email/Username. Please Signup.",
        ),
      );
    // checkpassword
    const isIdeal = await user.comparePassword(password);
    if (!isIdeal)
      return next(
        new DevUnityError(
          401,
          "It seems your Email/Username or Password is incorrect.",
        ),
      );

    const token = user.genJwt();
    if (!token)
      return next(
        new DevUnityError(
          500,
          "It's an issue from our side. Please try again later.",
        ),
      );
    new DevUnityRes(res, 200, "Loggedin Successfully.", user._id).authenticate(
      token,
    );
  },
);
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, username, password } = req.body;
    if (!email || !username || !password)
      return next(new DevUnityError(400, "Please provide all fields."));
    const usernameValidation = new UsernameValidation(username);
    // check username validity
    let validity: any = usernameValidation.isValid();
    if (!validity)
      return next(
        new DevUnityError(
          400,
          "Invalid username. Please follow all username specification rules",
        ),
      );
    // check username username Availability
    validity = await usernameValidation.isAvailable();
    // is validity is null username is through the trouble
    if (!validity)
      return next(
        new DevUnityError(400, `${username} is already taken by someone else.`),
      );
    // check email availablity
    const isAlreadyUser = await User.exists({ email });
    if (isAlreadyUser)
      return next(
        new DevUnityError(400, "Email already in use, try to login."),
      );
    const verificationToken = uuidv4();
    const verificationHTML = verificationHTMLCreator({
      token: verificationToken,
    });
    // create User document
    const user = await User.create({
      name,
      username,
      email,
      password,
      avatar: {
        secure_url: null,
        public_id: null,
      },
      verification: {
        verified: false,
        // 3 days
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        token: verificationToken,
      },
    });
    // send verification email as well as add token to the db
    const mail = await mailer({
      to: email,
      subject: "Verify your account | DevUnity",
      body: verificationHTML,
    });
    const token = user.genJwt();
    if (!token || !mail)
      return next(
        new DevUnityError(
          500,
          "It's an issue from our side. Please try again later.",
        ),
      );
    // sending response
    new DevUnityRes(
      res,
      201,
      "Signup Successfully, Please verify your account.",
      user._id,
    ).authenticate(token);
  },
);
export const verify = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    if (!token)
      return next(new DevUnityError(400, "Token not found, Please try again."));
    // checking if token is available and not expired
    const isIdeal = await User.findOne({
      "verification.token": token,
      "verification.expiresAt": { $gte: Date.now() },
    });
    if (!isIdeal)
      return next(
        new DevUnityError(400, "May token is modified or have been expired."),
      );

    const updateUser = await User.updateOne(
      {
        "verification.token": token,
        "verification.expiresAt": { $gte: Date.now() },
      },
      {
        verification: {
          verified: true,
          token: null,
          expiresAt: null,
        },
      },
    );
    if (!updateUser)
      return next(new DevUnityError(500, "Internal server error"));

    new DevUnityRes(res, 200, "Verified Successfully", true).send();
  },
);
export const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword, currentPassword } = req.body;
    if (!newPassword || !currentPassword)
      return next(new DevUnityError(500, "Please provide all fields."));
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "Please Reset password. If you have no access to your account.",
        ),
      );
    const isIdeal = await user.comparePassword(currentPassword);
    if (!isIdeal)
      return next(
        new DevUnityError(
          401,
          "Your current password is wrong, Try resetting password.",
        ),
      );
    user.password = newPassword;
    await user.save();
    new DevUnityRes(res, 200, "Password changed", true).send();
  },
);
export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) return next(new DevUnityError(500, "Please provide Email."));
    const user = await User.findOne({ email });
    if (!user)
      return next(new DevUnityError(500, "No user found with this Email."));
    // reset password token
    const token = uuidv4();
    const resetTokenHTML = resetHTMLCreator({
      name: user.name || user.username,
      token,
    });
    const updatedUser = await user.updateOne({
      resetPassword: {
        token,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    if (!updatedUser)
      return next(new DevUnityError(500, "Internal server error."));
    const mail = await mailer({
      to: email,
      subject: "Reset Password | DevUnity",
      body: resetTokenHTML,
    });
    if (!mail)
      return next(
        new DevUnityError(
          500,
          "Couldn't Send mail at the moment. Please try again later.",
        ),
      );
    new DevUnityRes(
      res,
      200,
      "Reset password link send to you, Please check your email.",
      true,
    ).send();
  },
);
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    if (!token)
      return next(new DevUnityError(400, "Reset password token modified."));
    const { newPassword } = req.body;
    if (!newPassword)
      return next(
        new DevUnityError(400, "Please provide a new Password to set."),
      );
    const user = await User.findOne({
      "resetPassword.token": token,
      "resetPassword.expiresAt": { $gte: Date.now() },
    }).select("+password");
    if (!user)
      return next(new DevUnityError(400, "The link is modified or expired."));
    user.resetPassword.token = null;
    user.resetPassword.expiresAt = null;
    user.password = newPassword;
    await user.save();
    new DevUnityRes(res, 200, "Password Reset successfully.", true).send();
  },
);
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    if (!userId)
      return next(new DevUnityError(400, "Please provide a userId."));
    const user = await User.findById(userId).populate({
      model: Room,
      path: "rooms",
      select:
        "_id admin roomId updatedAt createdAt project.title project.explanation project.lang",
    });
    if (!user) return next(new DevUnityError(500, "No user found w/ this id."));
    const clientUser = new UserDTO(user).translate();
    new DevUnityRes(res, 200, undefined, clientUser).send();
  },
);
export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _user = req.user;
    if (!_user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated. Please login.",
        ),
      );
    // TODO: later fix it
    const user = await User.findById(_user._id).populate({
      path: "rooms",
      model: Room,
      select:
        "project.explanation project.lang project.title _id roomId admin createdAt updatedAt",
    });
    const clientUser = new UserDTO(user!).translate();
    new DevUnityRes(res, 200, undefined, clientUser).send();
  },
);
export const editMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, name, location, portfolio, bio } = req.body;
    const avatar = req.file || null;
    if (!username && !name && !avatar)
      return next(
        new DevUnityError(400, "Provide atleast one field to modify."),
      );
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    if (avatar) {
      if (user.avatar.public_id) {
        // delete old image if available
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
      // parse new image
      const parsedAvatar = getDataUri(avatar);
      // upload new parsed image
      const cloud = await cloudinary.v2.uploader.upload(parsedAvatar.content!, {
        folder: "DevUnity",
      });
      if (!cloud)
        return next(
          new DevUnityError(
            500,
            "Unable to upload avatar, Please try again later.",
          ),
        );
      // update user
      user.avatar.public_id = cloud.public_id;
      user.avatar.secure_url = cloud.secure_url;
    }
    // if username requested to change
    if (username && username !== user.username) {
      const validation = new UsernameValidation(username);
      if (!validation.isValid())
        return next(new DevUnityError(400, "Username validation failed."));
      if (!(await validation.isAvailable()))
        return next(
          new DevUnityError(400, "Username is already taken by someone else."),
        );
      user.username = username;
    }
    user.name = name;
    user.location = location;
    user.portfolio = portfolio;
    user.bio = bio;
    await user.save();
    new DevUnityRes(res, 200, "Profile updated Successfully.", true).send();
  },
);

export const usernameAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    const { username } = req.body;
    const validation = new UsernameValidation(username as string);
    if (!validation.isValid())
      return next(new DevUnityError(400, "Username validation failed."));
    if (userId) {
      const user = await User.findById(userId);
      if (!user) return next(new DevUnityError(400, "URL is Manipulated."));
      if (user.username === username) {
        return new DevUnityRes(res, 200, undefined, true).send();
      }
    }
    const isAvailable = await validation.isAvailable();
    return new DevUnityRes(res, 200, undefined, isAvailable).send();
  },
);

export const contact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { f_name, l_name, email, message } = req.body;
    if (!f_name || !email)
      return next(
        new DevUnityError(400, "You must provide first name and email."),
      );
    const name = f_name + " " + l_name;
    const contactUsHTML = contactUsHTMLCreator({ name, email, message });
    const smtp_mail = process.env.SMTP_MAIL;
    if (!smtp_mail)
      return next(
        new DevUnityError(400, "Couldn't send email, Please try again later."),
      );
    const mail = mailer({
      to: smtp_mail,
      subject: "Contact us | DevUnity",
      body: contactUsHTML,
    });
    if (!mail)
      return next(
        new DevUnityError(400, "Couldn't send email, Please try again later."),
      );
    new DevUnityRes(res, 200, "Mail sent.", true).send();
  },
);
export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "User must be authorized to perform termination of account.",
        ),
      );
    // delete user and his rooms
    const deletedUser = await user.deleteOne();
    if (!deletedUser)
      return next(
        new DevUnityError(
          400,
          "Account couldn't be deleted for some internal server issue, Please try again later.",
        ),
      );
    new DevUnityRes(
      res,
      200,
      "Account deleted along with owner's rooms.",
      true,
    ).send();
  },
);
export const searchUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let { page, size } = req.query;
    const { query } = req.params;
    if (!page) page = "1";
    if (!size) size = "10";

    const skipAmount =
      (parseInt(page as string) - 1) * parseInt(size as string);
    // forming query
    const searchQuery = query
      ? {
          $or: [
            { username: { $regex: new RegExp(query, "i") } },
            { name: { $regex: new RegExp(query, "i") } },
          ],
        }
      : {};
    const users = await User.find(searchQuery)
      .populate({
        model: Room,
        path: "rooms",
        select:
          "_id roomId admin updatedAt createdAt project.title project.explanation project.lang",
      })
      .skip(skipAmount)
      .sort({ createdAt: -1 })
      .limit(parseInt(size as string));

    if (!users)
      return next(new DevUnityError(500, "No user found w/ this query."));
    const totalDocuments = await User.countDocuments(searchQuery);
    const isNext = totalDocuments > skipAmount + users.length;
    new DevUnityRes(res, 200, undefined, { isNext, users }).send();
  },
);
export const logout = catchAsync(async (req: Request, res: Response) => {
  new DevUnityRes(res, 200, "Logout Successful").deauthenticate();
});
