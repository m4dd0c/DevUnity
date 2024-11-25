import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import DevUnityError from "../utils/DevUnityError";
import User from "../model/User";

export const authenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(
      new DevUnityError(401, "It seems like you're unauthenticated."),
    );
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret)
    return next(
      new DevUnityError(
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
        new DevUnityError(401, "It seems like you're unauthenticated."),
      );
    /* req.user declare in /src/types/index.d.ts
    ./src/types added to tsconfig typeRoots, before /node_module/@types */
    req.user = user;
    next();
  } else {
    next(new DevUnityError(401, "It seems like you're unauthenticated."));
  }
});
