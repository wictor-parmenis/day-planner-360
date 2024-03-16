import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../entities/UsersTokens";
import { ICreateUserTokensDTO } from "../useCases/authenticateUser/createUserTokenDTO";
import { IUsersTokensRepository } from "./IUsersTokensRepository";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersToken> {
    const userToken = this.repository.create({ expires_date, refresh_token, user_id });

    return this.repository.save(userToken);
  }

  async findByUserIdAndRefreshToken({ user_id, refresh_token }): Promise<UsersToken> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
