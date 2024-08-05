import { IUser } from "../types/types";

class UserDTO {
  private user: IUser;
  constructor(user: IUser) {
    this.user = user;
  }
  translate() {
    const user = {
      _id: this.user._id,
      rooms: this.user.rooms,
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      verification: {
        verified: this.user.verification.verified,
      },
      avatar: {
        secure_url: this.user.avatar.secure_url,
      },
    };
    return user;
  }
}
export default UserDTO;
