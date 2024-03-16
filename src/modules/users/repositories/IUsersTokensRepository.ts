import { UsersToken as UserToken } from '../entities/UsersTokens';
import { ICreateUserTokensDTO } from '../useCases/authenticateUser/createUserTokenDTO';

export interface IFindByUserIdAndRefreshToken {
  user_id: string;
  refresh_token: string;
}

export interface IUsersTokensRepository {
  create: ({expires_date, refresh_token, user_id}: ICreateUserTokensDTO) => Promise<UserToken>;
  findByUserIdAndRefreshToken: ({refresh_token, user_id}:IFindByUserIdAndRefreshToken) => Promise<UserToken>;
  deleteById: (id: string) => Promise<void>;
}
