import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MicroUserService {
  constructor(
    @Inject('EEVEE_USER') private userClient: ClientProxy,
  ) { }
  getIds = async (count: number): Promise<string[]> => {
    const list = await new Promise<string[]>((resolve, reject) => {
      this.userClient.send('getIds', count).subscribe({
        next: result => resolve(result),
        error: error => reject(error),
      });
    });
    return list;
  }
}
