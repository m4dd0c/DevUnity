import express from "express";
import { authenticated } from "../middleware/authenticated";
import {
  login,
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
  search,
} from "../controller/userController";
import imageInterceptor from "../middleware/multer";

const router = express.Router();

router.route("/username/available").get(usernameAvailability);
router.route("/login").post(login);
router.route("/signup").post(imageInterceptor, signup);
router.route("/verify/:token").get(verify);
router.route("/password/change").put(authenticated, changePassword);
router.route("/password/forget").put(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/:userId").get(getUser);
router.route("/search/:query").get(search);
router
  .route("/me")
  .put(authenticated, imageInterceptor, editMe)
  .delete(authenticated, deleteMe);
router.route("/contact").post(contact);
export default router;
