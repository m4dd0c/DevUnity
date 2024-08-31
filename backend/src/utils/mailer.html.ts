export const verificationHTMLCreator = ({ token }: { token: string }) => {
  const verify_url = `${process.env.FRONTEND_URI}/user/verify?token=${token}`;
  return `<div style="width: 100%; height: 100%; background-color: black">
      <div
        style="
          margin: auto;
          min-height: 100vh;
          max-width: 800px;
          background-color: black;
          color: white;
        "
      >
        <div style="padding: 40px 0">
          <h1
            style="
              background: linear-gradient(to right, #5c6ac4, #8b5cf6);
              background-clip: text;
              text-align: center;
              font-size: 2.5rem;
              font-weight: bold;
              color: white;
              -webkit-text-fill-color: transparent;
            "
          >
            Welcome to Collabrite
          </h1>
          <p style="text-align: center">Collaborate, Create, Build</p>
        </div>
        <div
          style="
            background: linear-gradient(to right, black, rgb(41, 41, 41));
            padding-bottom: 40px;
            margin: auto;
          "
        >
          <img
            src="https://res.cloudinary.com/dscuiqkrh/image/upload/v1722816813/Collabrite/verify_oq8jkr.jpg"
            alt="verify-account"
            style="height: 100%; width: 100%"
          />
<div style="width: fit-content; margin: auto">
          <a
            style="
              margin-inline: auto;
              border-radius: 4px;
              background: linear-gradient(to bottom, #5c6ac4, #8b5cf6);
              padding: 8px 16px;
              text-decoration: none;
              color: white;
            "
            href="${verify_url}"
            >Verify your Account</a
          >
</div>
        </div>
        <div style="padding: 40px">
          <p>
            <strong>Info: </strong>Verification will expire in 15 minutes.
            Please verify your account within 15 minutes, otherwise your account
            will be terminated.
          </p>
          <br />
          <p>
            <strong>Note: </strong>If you haven't created an account on
            Collabrite, please ignore this and don't share with anyone.
          </p>
        </div>
        </div>
      </div>
`;
};
export const resetHTMLCreator = ({
  token,
  name,
}: {
  token: string;
  name: string;
}) => {
  const reset_url = `${process.env.FRONTEND_URI}/password/reset/${token}`;
  return `<div style="background-color: black; width: 100%; height: 100%; color: white">
      <div
        style="
          margin: auto;
          min-height: 100vh;
          max-width: 800px;
          background-color: black;
          color: white;
        "
      >
        <div style="padding: 40px 0">
          <h1
            style="
              background: linear-gradient(to right, #5c6ac4, #8b5cf6);
              background-clip: text;
              text-align: center;
              font-size: 2.5rem;
              font-weight: bold;
              color: white;
              -webkit-text-fill-color: transparent;
            "
          >
            Reset your Collabrite Password
          </h1>
          <p style="padding: 8px 0; text-align: center">
            We heard you need us, Here we are.
          </p>
        </div>
        <div
          style="
            background-color: #312e81;
            box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.9);
            width: 75%;
            height: 100%;
            margin: auto;
            gap: 20px;
            padding: 40px;
            max-width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            text-align: center;
          "
        >
          <h1 style="font-size: 1.125rem;">Hi ${name},</h1>
          <p>
            We are sending this email because you requested a password reset.
            <br />Click on this link to create a new Password
          </p>
          <a
            href="${reset_url}"
            style="
              border-radius: 9999px;
              width: 66.67%;
              text-align: center;
              padding: 8px 16px;
              background: linear-gradient(35deg, #5c6ac4, #8b5cf6);
              transition: all 0.3s;
              text-decoration: none;
              color: white;
            "
            >Reset Password</a
          >
        </div>
        <div style="padding: 40px">
          <p>
            <strong>Info: </strong>Reset Password link will expire in 15
            minutes. Please verify your account within 15 minutes, otherwise,
            you'll have to request another reset password link.
          </p>
          <br />
          <p>
            <strong>Note: </strong>If you haven't requested any reset password.
            Please ignore this and don't share it with anyone.
          </p>
        </div>
    </div>
    </div>
`;
};
export const contactUsHTMLCreator = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => `<div style="color: white; background-color: black; width: 100%; height: 100%">

      <div
        style="
          margin: auto;
          min-height: 100vh;
          max-width: 800px;
          background-color: black;
          color: white;
        "
      >
        <div style="padding: 40px 0;">
          <h1
            style="
              background: linear-gradient(to right, #5c6ac4, #8b5cf6);
              background-clip: text;
              text-align: center;
              font-size: 2.5rem;
              font-weight: bold;
              color: white;
              -webkit-text-fill-color: transparent;
            "
          >
            Connect to Collabrite
          </h1>
          <p style="text-align: center">Why not have a chat while you can.</p>
        </div>
        <div
          style="
            margin: auto;
            background-color: #312e81;
            width: 75%;
            height: 100%;
            padding: 40px;
          "
        >
          <h1>Hey, I'm &nbsp;<strong>${name}</strong>,</h1>
          <p>
            Contact me at &nbsp;<a
              style="text-decoration: underline; color: #3b82f6"
              href="mailto:${email}"
              >${email}</a
            >,
          </p>
          <div style="border: 1px solid white"></div>
          <p>${message}</p>
        </div>
        <div style="padding: 40px; margin: auto;">
          <p>
            <strong>Info: </strong>Anyone can contact from any email as It is
            not required to be loggedin in order to contact.<br />Hence one can foul his/her
            identity.
          </p>
        </div>
    </div>
      </div>
      </div>
`;
