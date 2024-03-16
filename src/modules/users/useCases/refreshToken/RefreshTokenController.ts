import { Response, Request } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


export class RefreshTokenController {
    async handle(request:Request, reponse:Response):Promise<Response> {

        const token = request.body.token || request.headers['x-access-token'] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        const refresh_token = await refreshTokenUseCase.execute(token);

        return reponse.json(refresh_token);
        
    }
}