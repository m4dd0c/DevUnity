import express from "express";
import { authenticated } from "../middleware/authenticated";
import {
  signin,
  signup,
  verify,
  changePassword,
  forgetPassword,
  resetPassword,
  getUser,
  editMe,
  usernameAvailability,
  contact,
  deleteMe,
  searchUser,
  getMe,
  logout,
} from "../controller/userController";
import imageInterceptor from "../middleware/multer";

const router = express.Router();

router.route("/username/available").post(usernameAvailability);
router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.route("/verify/:token").get(verify);
router.route("/logout").get(logout);
router.route("/password/change").put(authenticated, changePassword);
router.route("/password/forget").put(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile/:userId").get(getUser);
router.route("/search/:query").get(searchUser);
router
  .route("/me")
  .get(authenticated, getMe)
  .put(authenticated, imageInterceptor, editMe)
  .delete(authenticated, deleteMe);
router.route("/contact").post(contact);
export default router;
