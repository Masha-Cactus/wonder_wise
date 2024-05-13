import { authClient, baseClient, formDataClient } from "@/src/api";
import { 
  ISocial,
  IUser,
  IUpdateEmail, 
  IUpdateImage, 
  IUpdateInfo, 
  IUpdatePassword,
  ShortCollection, 
  IToken, 
  IComment,
} from "@/src/services";

class UserService {
  private BASE_URL = '/users';

  getSocials (userId: number) {
    return baseClient.get<never, ISocial[]>(`${this.BASE_URL}/${userId}/social-links`);
  };

  getProfile (userId: number) {
    return baseClient.get<never, IUser>(`${this.BASE_URL}/${userId}/profile`);
  };

  getCollections (userId: number) {
    return authClient.get<never, ShortCollection[]>(`${this.BASE_URL}/${userId}/collections`);
  };

  getComments(userId: number) {
    return authClient.get<never, IComment[]>(`${this.BASE_URL}/${userId}/comments`);
  };

  updatePassword ({userId, ...data}: IUpdatePassword) {
    return authClient.put<never, IToken>(
      `${this.BASE_URL}/update-user-password/${userId}`,
      data,
    );
  }

  requestUpdateEmail ({userId, newEmail}: IUpdateEmail) {
    return authClient.post<never, IUser>(
      `${this.BASE_URL}/request-update-user-email/${userId}`,
      { email: newEmail },
    );
  };

  updateEmail ({userId, newEmail}: IUpdateEmail) {
    return authClient.put<never, IToken>(
      `${this.BASE_URL}/update-user-email/${userId}`,
      { email: newEmail },
    );
  };

  updateUserInfo ({userId, ...data}: IUpdateInfo) {
    return authClient.put<never, IUser>(
      `${this.BASE_URL}/update-user-info/${userId}`,
      data,
    );
  };

  updateImage (data: IUpdateImage) {
    return formDataClient.put<never, IUser>(
      `${this.BASE_URL}/update-user-image/${data.id}`,
      data, 
    );
  }

  deleteUser (userId: number) {
    return authClient.delete(`${this.BASE_URL}/delete-user/${userId}`);
  };
}

export const userService = new UserService();