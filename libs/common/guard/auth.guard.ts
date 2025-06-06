// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { Observable } from 'rxjs';
// import { UnauthorizedError } from '../error/unauthorized.error';
// import { UserRequest } from '@app/contract';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) {}

//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const request: Request = context.switchToHttp().getRequest();

//         const token: string | undefined = request.headers.authorization;

//         if (token) {
//             if (token.startsWith('Bearer ')) {
//                 const jwt: string = token.split(' ')[1];
//                 const payload: UserRequest =
//                     this.jwtService.verify<UserRequest>(jwt);

//                 request.user = payload;
//                 return true;
//             }
//         }

//         throw new UnauthorizedError();
//     }
// }
