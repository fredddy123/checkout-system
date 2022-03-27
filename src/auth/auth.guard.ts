import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly appService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const account = await this.appService.getShopTerminalAccountByToken(
      request.headers.authorization.replace(/Bearer /, () => ''),
    );

    if (!account) {
      return false;
    }

    request.account = account;

    return true;
  }
}
