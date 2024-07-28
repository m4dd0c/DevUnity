import { Request, Response, NextFunction } from "express";
import CollabriteError from "../utils/CollabriteError";
import CollabriteRes from "../utils/CollabriteRes";

const error = (
  err: CollabriteError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // maybe change this TODO: development
    const development = process.env["Mode"] === "DEV";
    // response instance
    const errRes = new CollabriteRes(res);

    errRes.status = err.status || 500;

    // if production
    if (/ECONNREFUSED.*27017/i.test(err.message)) {
      errRes.message = "Couldn't connect to database. It maybe down.";
    } else if (err instanceof SyntaxError || err instanceof URIError) {
      errRes.message = "Unprocessable Request.";
    } else if (err instanceof CollabriteError) {
      errRes.message = err.message;
    } else {
      errRes.message =
        "Our Collaborators are searching 'How to code', Please try again later.";
    }

    // TODO:
    // if (production)
    // save to db capped

    if (development) errRes.data = err.stack;

    errRes.send();
  } catch (error) {
    console.log("Something went really wrong, Please contact support", error);
  }
};
export default error;
