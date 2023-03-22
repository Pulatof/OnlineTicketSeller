import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/customer/models/customer.model';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('customer unauthorized');
    }
    const bear = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bear != 'Bearer' || !token) {
      throw new UnauthorizedException('User unauthorized');
    }
    console.log(token);
    
    async function verify(token: string, jwtService: JwtService) {
      const customer: Partial<Customer> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!customer) {
        throw new UnauthorizedException('invalid token provided');
      }
      if (!customer.birth_day) {
        throw new BadRequestException('customer is not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
