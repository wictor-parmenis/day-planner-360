import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';
import { Router } from 'express';

import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';

const authenticationRouter = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticationRouter.post('/sessions', authenticateUserController.execute);
authenticationRouter.post('/refresh-token', refreshTokenController.handle);


export { authenticationRouter };
