import jwt from 'jsonwebtoken'
import { UserAuthData } from 'src/models/UserModel';

export const verifyToken = (token: string, secretKey: string): Promise<UserAuthData> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded: UserAuthData) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}
const modules = {
  verifyToken
}
export default modules 