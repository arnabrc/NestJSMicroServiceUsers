import {ClientProxy} from '@nestjs/microservices/client';
import {timeout} from 'rxjs/internal/operators';
import { CanActivate, ExecutionContext, Injectable, Inject, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const res = await this.client.send(
        { role: 'auth', cmd: 'check' },
        { jwt: req.headers['authorization']?.split(' ')[1]})
        .pipe(timeout(5000))
        .toPromise<boolean>();

      return res;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
