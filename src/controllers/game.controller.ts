import { Controller, Post, Body, Res, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';

interface ConsumeCoinsDto {
  userId: string;
  coins: number;
}

@Controller('game')
export class GameController {
  constructor(private readonly userService: UserService) {}

  @Post('consume-coins')
  consumeCoins(@Body() body: ConsumeCoinsDto, @Res() res: Response) {
    try {
      this.userService.consumeCoins(body.userId, body.coins);
      const response = { message: 'Coins consumed', data: { userId: body.userId, coins: body.coins } };
      res.locals.response = response;
      res.status(200).json(response);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

