import { Request, Response, NextFunction } from "express";
import CollabriteError from "../utils/CollabriteError";
import CollabriteRes from "../utils/CollabriteRes";
import ErrorLogs from "../model/ErrorLogs";

const error = async (
  err: CollabriteError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // maybe change this TODO: development
    // const development = process.env["Mode"] === "DEV";
    const development = true;
    // response instance
    const errRes = new CollabriteRes(res);
    console.log("error", err);
    errRes.status = err.status || 500;

    // if production
    if (/ECONNREFUSED.*27017/i.test(err.message)) {
      errRes.message = "Couldn't connect to database. It maybe down.";
      // if SyntaxError or wrong uri
    } else if (err instanceof SyntaxError || err instanceof URIError) {
      errRes.message = "Unprocessable Request.";
      // if custom error
    } else if (err instanceof CollabriteError) {
      errRes.message = err.message;
      // unhandled from above conditions
    } else {
      // @ts-ignore
      errRes.message = err?.message || "Internal server error.";
    }

    if (development) errRes.data = err.stack;
    if (!development) {
      await ErrorLogs.create({
        message: err.message,
        stack: err.stack,
        status: err.status,
      });
    }
    errRes.data = err.stack;
    errRes.send();
  } catch (error) {
    console.log(
      "Our Collaborators are searching 'How to code', Please try again later or contact support.",
      error,
    );
  }
};
export default error;
