import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector : Reflector,
        private jwtService : JwtService
    ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRole = this.reflector.getAllAndOverride("roles" , [context.getHandler() , context.getClass()])
    if(!getRole) return true

    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]

    try {
        if(!token) throw new UnauthorizedException("pas de token")
            const validationToken = this.jwtService.verify(token.split(" ")[1] , {secret : 'auth_bb'})
            const res = getRole.some((dataRoles:string) => validationToken.role.includes(dataRoles))
            return res
    } catch (error) {
        throw new UnauthorizedException()
    }
  }
}
