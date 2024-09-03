import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import CollabriteError from "../utils/CollabriteError";
import { JwtPayload } from "../types/types";
import User from "../model/User";

export const authenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(
      new CollabriteError(401, "It seems like you're unauthenticated."),
    );
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret)
    return next(
      new CollabriteError(
        500,
        "It's a issue from our side. Please try again later.",
      ),
    );
  const verified = jwt.verify(token, jwtSecret) as JwtPayload;
  if (verified) {
    const userId = verified._id;
    const user = await User.findById(userId).select("+password");
    if (!user)
      return next(
        new CollabriteError(401, "It seems like you're unauthenticated."),
      );
    /* req.user declare in /src/types/index.d.ts
    ./src/types added to tsconfig typeRoots, before /node_module/@types */
    req.user = user;
    next();
  } else {
    next(new CollabriteError(401, "It seems like you're unauthenticated."));
  }
});
