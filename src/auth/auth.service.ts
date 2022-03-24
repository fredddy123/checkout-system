import { Injectable } from '@nestjs/common';

interface Account {
  id: string;
  name: string;
  authToken: string;
}

@Injectable()
export class AuthService {
  static accounts: Account[] = [
    {
      id: '100',
      name: 'ShopTerminal#123',
      authToken: 'shopTerminal#123.token',
    },
    {
      id: '200',
      name: 'ShopTerminal#456',
      authToken: 'shopTerminal#456.token',
    },
  ];

  async getShopTerminalAccountByToken(token: string): Promise<Account | null> {
    return (
      AuthService.accounts.find((account) => account.authToken === token) ||
      null
    );
  }
}
