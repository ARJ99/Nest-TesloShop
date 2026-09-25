import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/get-roles.decorator';
import { User } from '../entities/user.entity';


@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY, [context.getHandler(), context.getClass()]);

    const request = context.switchToHttp().getRequest();

    const user = request.user as User;

    if (!user) {
      throw new BadRequestException("User not found");
    }

    for (const role of user.roles) {
      if (requiredRoles.includes(role)) {
        return true
      }
    }

    throw new ForbiddenException(`User : ${user.fullName} needs a valid role: ${requiredRoles}`)
  }
}
