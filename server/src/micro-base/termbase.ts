import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TERMBASE_SIMPLE } from './class';

@Injectable()
export class MicroTermbaseService {
  constructor(
    @Inject('EEVEE_TERMBASE') private userClient: ClientProxy,
  ) { }
  queryTermbases = async (content: string, locale: string): Promise<TERMBASE_SIMPLE[]> => {
    const list = await new Promise<TERMBASE_SIMPLE[]>((resolve, reject) => {
      this.userClient.send('queryTermbaseByContent', [content, locale]).subscribe({
        next: result => resolve(result),
        error: error => reject(error),
      });
    });
    return list;
  }
}
