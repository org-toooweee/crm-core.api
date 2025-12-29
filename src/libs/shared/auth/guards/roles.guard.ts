// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '@libs/shared/auth/decorators';
//
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );
//
//     if (!requiredRoles) {
//       return true;
//     }
//
//     const request: Request = context.switchToHttp().getRequest();
//     const user = request.user;
//
//     if (!user || !user.role) {
//       throw new ForbiddenException('Access denied');
//     }
//
//     const hasRole = requiredRoles.includes(user.role);
//     if (!hasRole) {
//       throw new ForbiddenException('Insufficient role');
//     }
//
//     return true;
//   }
// }
