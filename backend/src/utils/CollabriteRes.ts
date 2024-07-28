import { Response } from "express";

class CollabriteRes {
  private res: Response;
  status: number | undefined;
  message: string | undefined;
  data: any;
  constructor(res: Response, status?: number, message?: string, data?: any) {
    this.res = res;
    this.status = status;
    this.message = message || "ok";
    this.data = data || {};
  }
  send() {
    if (!this.status)
      return this.res
        .status(500)
        .json({ success: false, message: "unknown status code.", data: {} });

    this.res.status(this.status).json({
      success: this.status < 400,
      message: this.message,
      data: this.data,
    });
  }
}
export default CollabriteRes;
