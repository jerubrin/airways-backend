import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token]: string[] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('User is not authorized', HttpStatus.FORBIDDEN);
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (err) {
      throw new HttpException('User is not authorized', HttpStatus.FORBIDDEN);
    }
  }
}
