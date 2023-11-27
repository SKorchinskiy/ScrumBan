import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await (await context.switchToHttp()).getRequest();
    const authJwtToken = request.cookies['Authentication'];
    if (!authJwtToken) return false;
    const user = await this.jwtService.verify(authJwtToken);
    if (!user) return false;
    request.user = user;
    return true;
  }
}
