import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { IdempotencyMiddleware } from './middleware/idempotency.middleware';
import { IdempotencyService } from './services/idempotency.service';
import { GameController } from './controllers/game.controller';
import { UserService } from './services/user.service';

@Module({
  providers: [IdempotencyService, UserService],
  controllers: [GameController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdempotencyMiddleware)
      .forRoutes({ path: 'game/consume-coins', method: RequestMethod.POST });
  }
}

