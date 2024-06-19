import { Injectable, BadRequestException } from '@nestjs/common';

interface User {
  userId: string;
  coins: number;
}

@Injectable()
export class UserService {
  private readonly users: Map<string, User> = new Map();

  constructor() {
    // Initialize with a sample user
    this.users.set('user123', { userId: 'user123', coins: 20 });
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  consumeCoins(userId: string, coins: number): void {
    const user = this.users.get(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.coins < coins) {
      throw new BadRequestException('Not enough coins');
    }
    user.coins -= coins;
  }
}

