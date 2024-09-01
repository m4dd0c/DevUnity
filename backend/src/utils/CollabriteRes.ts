import { Response } from "express";

class CollabriteRes {
  private res: Response;
  status: number | undefined;
  message: string | undefined;
  data: any;
  constructor(res: Response, status?: number, message?: string, data?: any) {
    this.res = res;
    this.status = status;
    this.message = message ?? "ok";
    this.data = data ?? {};
  }
  authenticate(token: string) {
    this.res.cookie("token", token, {
      // setting cookie expiry of 30 days
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      // prevent cookie being accessed from client-side, xss protection
      httpOnly: true,
      // to process req in https manner mitm protection
      secure: true,
      // csrf protection (setting sameSite:none requires secure:true)
      sameSite: "none",
    });
    this.send();
  }
  deauthenticate() {
    this.res.status(200).cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    this.message = "Logged out!";
    this.send();
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
