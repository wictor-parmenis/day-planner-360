import auth from "@config/auth";
import dayjs from "dayjs";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { v4 as uuid } from "uuid";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute(token: string):Promise<ITokenResponse> {
        const {sub: user_id, email} = verify(token, auth.jwt.secretRefreshToken) as IPayload;
        
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken({user_id, refresh_token: token});

        if(!userToken) {
            throw new Error('Refresh token not exists');
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refreshToken = sign({email}, auth.jwt.secretRefreshToken, {
            subject: user_id,
            expiresIn: auth.jwt.expiresInRefreshToken,
        });

        const newToken = sign({ }, auth.jwt.secret, {
            subject: user_id,
            expiresIn : auth.jwt.expiresIn,
          })

        await this.usersTokensRepository.create({
            refresh_token: refreshToken,
            user_id,
            id: uuid(),
            expires_date: dayjs().add(15, "minutes").toDate(),
        })

        return {
            refresh_token: refreshToken,
            token: newToken
        };

    }
}