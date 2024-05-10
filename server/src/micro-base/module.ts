import { Module } from '@nestjs/common';
import { MicroUserService } from './user';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroTermbaseService } from './termbase';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EEVEE_USER',
        useFactory: async () => {
          return {
            transport: Transport.TCP,
            options: {
              host: process.env.MICRO_USER_HOST,
              port: Number(process.env.MICRO_USER_PORT)
            }
          }
        }
      },
      {
        name: 'EEVEE_TERMBASE',
        useFactory: async () => {
          return {
            transport: Transport.TCP,
            options: {
              host: process.env.MICRO_TERMBASE_HOST,
              port: Number(process.env.MICRO_TERMBASE_PORT)
            }
          }
        }
      }
    ]),
  ],
  providers: [MicroUserService, MicroTermbaseService],
  exports: [MicroUserService, MicroTermbaseService],
})
export class MicroBaseModule { }