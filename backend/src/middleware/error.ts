import { Request, Response } from "express";
import DevUnityError from "../utils/DevUnityError";
import DevUnityRes from "../utils/DevUnityRes";
import ErrorLogs from "../model/ErrorLogs";

const error = async (err: DevUnityError, req: Request, res: Response) => {
  try {
    const development = process.env["Mode"] === "DEV";
    // response instance
    const errRes = new DevUnityRes(res);
    errRes.status = err.status || 500;

    // if production
    if (/ECONNREFUSED.*27017/i.test(err.message)) {
      errRes.message = "Couldn't connect to database. It maybe down.";
      // if SyntaxError or wrong uri
    } else if (err instanceof SyntaxError || err instanceof URIError) {
      errRes.message = "Unprocessable Request.";
      // if custom error
    } else if (err instanceof DevUnityError) {
      errRes.message = err.message;
      // unhandled from above conditions
    } else {
      errRes.message = (err as any)?.message || "Internal server error.";
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
