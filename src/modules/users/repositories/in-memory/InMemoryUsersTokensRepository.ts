
import { UsersToken } from "../../entities/UsersTokens";
import { ICreateUserTokensDTO } from "../../useCases/authenticateUser/createUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  private tokens: UsersToken[] = [];

  async create(data: ICreateUserTokensDTO): Promise<UsersToken> {
    const userToken = new UsersToken();
    Object.assign(userToken, data);
    this.tokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken({ user_id, refresh_token }): Promise<UsersToken> {
    return this.tokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
  }

  async deleteById(id: string): Promise<void> {
    this.tokens = this.tokens.filter(token => token.id !== id);
  }
}
